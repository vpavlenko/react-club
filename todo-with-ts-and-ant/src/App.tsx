import React, { useState, useRef, MouseEvent, useEffect } from "react";
import { Input, Button, Icon } from "antd";
import "./App.css";

type TodoListItemType = {
  content: string;
  done: boolean;
};

type TodoListItemProps = {
  item: TodoListItemType;
  doneThisItem: () => void;
  setNewValue: (newValue: string) => void;
};

const TodoListItem: React.FC<TodoListItemProps> = (
  props: TodoListItemProps
) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.item.content);
  const inputEl = useRef<Input>(null);
  useEffect(() => {
    editMode && inputEl.current && inputEl.current.focus();
  }, [editMode]);

  return (
    <div
      className="todo-list-item"
      style={props.item.done ? { textDecoration: "line-through" } : {}}
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
      {!editMode && <Icon
        type="edit"
        className="todo-list-item__icon"
        onClick={event => {
          setEditMode(true);
          event.stopPropagation();
        }}
      />}
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

  function addNewItemHandler(event: MouseEvent) {
    const newItems = [...items, { content: newItemContent, done: false }];
    setItems(newItems);
    setNewItemContent("");
    inputEl.current && inputEl.current.focus();
  }

  return (
    <div className="app">
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
          />
        );
      })}
      <Input
        size="large"
        value={newItemContent}
        autoFocus
        ref={inputEl}
        onChange={event => {
          setNewItemContent(event.target.value);
        }}
      />
      <Button onClick={addNewItemHandler}>Add new item</Button>
    </div>
  );
}

export default App;
