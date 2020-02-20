import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function TodoListItem(props) {
  return (
    <div
      style={props.item.done ? { textDecoration: "line-through" } : {}}
      onClick={event => props.doneThisItem()}
    >
      {props.item.content}
    </div>
  );
}


function App() {
  console.log("RERENDER");

  const [items, setItems] = useState([
    { content: "Run a React club", done: false },
    { content: "Run a Redux club", done: true },
    { content: "Run a Hooks club", done: false }
  ]);

  const [newItemContent, setNewItemContent] = useState("");

  const inputEl = useRef(null);

  function addNewItemHandler(event) {
    const newItems = [...items, { content: newItemContent, done: false }];
    setItems(newItems);
    setNewItemContent("");
    inputEl.current.focus();
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
      <input
        type="button"
        value="Add new item"
        onClick={addNewItemHandler}
      />
    </div>
  );
}

export default App;
