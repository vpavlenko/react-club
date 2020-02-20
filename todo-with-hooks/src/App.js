import React, { useState, useRef } from "react";

const TodoListItem = ({ item, ourOwnHandleClick }) => {
  return (
    <div
      onClick={ourOwnHandleClick}
      style={item.done ? { textDecoration: "line-through" } : {}}
    >
      {item.content}
    </div>
  );
};

function TodoList() {
  console.log("RERENDER");
  const [items, setItems] = useState([
    { content: "Run a React club", done: false },
    { content: "Run a Redux club", done: false },
    { content: "Run a Hooks club", done: false },
    { content: "Run a GraphQL club", done: false }
  ]);
  const [newItem, setNewItem] = useState("");
  const inputRef = useRef(null);

  return (
    <div>
      {items.map((item, index) => (
        <TodoListItem
          item={item}
          ourOwnHandleClick={() => {
            setItems([
              ...items.slice(0, index),
              { content: item.content, done: !item.done },
              ...items.slice(index + 1)
            ]);
          }}
        />
      ))}
      <div>
        <input
          type="text"
          placeholder="Eg. Do laundry"
          autoFocus={true}
          ref={inputRef}
          value={newItem}
          onChange={event => setNewItem(event.target.value)}
        />
        <input
          type="button"
          value="Add"
          onClick={() => {
            setItems([...items, { content: newItem, done: false }]);
            setNewItem("");
            inputRef.current.focus();
          }}
        />
      </div>
    </div>
  );
}

function App() {
  return <TodoList />;
}

export default App;
