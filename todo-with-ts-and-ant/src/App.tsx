import React, { useState, useRef, MouseEvent, useEffect } from "react";
import { Input, Button, Icon, Typography } from "antd";
import styled from "styled-components";
import "./App.css";

type TodoListItemType = {
  content: string;
  done: boolean;
};

type TodoListItemProps = {
  item: TodoListItemType;
  doneThisItem: () => void;
  setNewValue: (newValue: string) => void;
  removeItem: () => void;
};

const PaddedIcon = styled.span`
  margin: 0 5px;
  font-size: 20px;
`;

type HoverIconProps = {
  type: string;
  onClick: (event: MouseEvent) => void;
};

const HoverIcon: React.FC<HoverIconProps> = ({
  type,
  onClick
}: HoverIconProps) => {
  const [hover, setHover] = useState(false);

  return (
    <PaddedIcon>
      <div
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Icon
          type={type}
          onClick={onClick}
          theme={hover ? "filled" : "outlined"}
          className="todo-list-item__icon"
        ></Icon>
      </div>
    </PaddedIcon>
  );
};

const TodoListItem: React.FC<TodoListItemProps> = (
  props: TodoListItemProps
) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.item.content);
  const inputEl = useRef<Input>(null);
  useEffect(() => {
    editMode && inputEl.current && inputEl.current.select();
  }, [editMode]);

  return (
    <div
      className="todo-list-item"
      style={
        props.item.done
          ? { textDecoration: "line-through", backgroundColor: "#ccc" }
          : {}
      }
      onClick={() => props.doneThisItem()}
    >
      {editMode ? (
        <Input
          ref={inputEl}
          value={value}
          onChange={event => setValue(event.target.value)}
          onPressEnter={() => {
            props.setNewValue(value);
            setEditMode(false);
          }}
          onClick={event => {
            event.stopPropagation();
          }}
        />
      ) : (
        <span>{props.item.content}</span>
      )}
      {!editMode && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <HoverIcon
            type="edit"
            onClick={event => {
              setEditMode(true);
              event.stopPropagation();
            }}
          />
          <HoverIcon
            type="delete"
            onClick={event => {
              props.removeItem();
              event.stopPropagation();
            }}
          />
        </div>
      )}
    </div>
  );
};

function usePersistedState<S>(
  key: string,
  defaultValue: S
): [S, (newValue: S) => void] {
  const [state, setState] = useState(() => {
    return JSON.parse(
      localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function App() {
  console.log("RERENDER");

  const [items, setItems] = usePersistedState("todo-list", [
    { content: "Run a React club", done: false },
    { content: "Run a Redux club", done: true },
    { content: "Run a Hooks club", done: false }
  ]);

  const [newItemContent, setNewItemContent] = useState("");

  const inputEl = useRef<Input>(null);

  function addNewItemHandler() {
    const newItems = [...items, { content: newItemContent, done: false }];
    setItems(newItems);
    setNewItemContent("");
    inputEl.current && inputEl.current.focus();
  }

  return (
    <div className="app">
      <Typography.Title>What needs to be done?</Typography.Title>
      {items.map((item, index) => {
        return (
          <TodoListItem
            item={item}
            doneThisItem={() => {
              // Don't do this!
              item.done = !item.done;
              const newItems = [...items];

              setItems(newItems);
            }}
            setNewValue={newValue => {
              // Don't do this!
              item.content = newValue;
              const newItems = [...items];

              setItems(newItems);
            }}
            removeItem={() => {
              setItems([...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          />
        );
      })}
      <div style={{ marginTop: "5em" }}>
        <Input
          size="large"
          placeholder="new item"
          value={newItemContent}
          autoFocus
          ref={inputEl}
          style={{ marginBottom: "1em" }}
          onChange={event => {
            setNewItemContent(event.target.value);
          }}
          onPressEnter={addNewItemHandler}
        />
        <Button onClick={addNewItemHandler}>Add new item</Button>
      </div>
    </div>
  );
}

export default App;
