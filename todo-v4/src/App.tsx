import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import logo from "./logo.svg";
import "./App.css";

type TodoListItem = {
  item: {
    content: string;
    done: boolean;
  };
  doneThisItem: () => void;
};

const TodoListItem: React.FC<TodoListItem> = (props: TodoListItem) => {
  return (
    <div
      style={props.item.done ? { textDecoration: "line-through" } : {}}
      onClick={event => props.doneThisItem()}
    >
      {props.item.content}
    </div>
  );
};

// function usePersistedState<S>(
//   key: string,
//   defaultValue: S
// ): [S, (newValue: S) => void] {
  const [state, setState] = useState(() => {
    return JSON.parse(
      localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  // return [state, setState];
// }

function App() {
  console.log("RERENDER");

  // const [items, setItems] = useState([
  //   { content: "Run a React club", done: false },
  //   { content: "Run a Redux club", done: true },
  //   { content: "Run a Hooks club", done: false }
  // ]);

  // const [items, setItems] = usePersistedState("mykey", [
  //   { content: "Run a React club", done: false },
  //   { content: "Run a Redux club", done: true },
  //   { content: "Run a Hooks club", done: false }
  // ]);

  const [items, setItems] = useState(() => {
    return JSON.parse(
      localStorage.getItem('mykey') || JSON.stringify(defaultValue)
    );
  });
  useEffect(() => {
    localStorage.setItem('mykey', JSON.stringify(state));
  }, [someOtherVar, items]);

  const [newItemContent, setNewItemContent] = useState("");

  const inputEl = useRef<HTMLInputElement>(null);

  function addNewItemHandler() {
    const newItems = [...items, { content: newItemContent, done: false }];
    setItems(newItems);
    setNewItemContent("");
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }

  return (
    <div>
      {items.map((item, index) => {
        return (
          <TodoListItem
            item={item}
            doneThisItem={() => {
              // Don't do this!
              item.done = !item.done;
              const newItems = [...items];

              // console.log(item);
              // newItems[index].done = !newItems[index].done;
              setItems(newItems);
            }}
          />
        );
      })}
      <input
        type="text"
        value={newItemContent}
        autoFocus
        ref={inputEl}
        onChange={event => {
          setNewItemContent(event.target.value);
        }}
      />
      <input type="button" value="Add new item" onClick={addNewItemHandler} />
      <Button>Default</Button>
    </div>
  );
}

export default App;
