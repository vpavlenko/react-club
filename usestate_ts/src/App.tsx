import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  return (
    <>
      <div
        style={{ backgroundColor: "blue" }}
        onClick={() => {
          console.log('line 13: ', data);
          setData(data + "A, ");
          // alert("A");
        }}
      >
        [A div]
        <div
          style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}
          onClick={event => {
            console.log('line 21: ', data);
            setData(prevState => prevState + "B, ");
            // alert("B");
            // event.stopPropagation();
          }}
        >
          [B div]
        </div>
      </div>
      <div>data: {data}</div>
    </>
  );
}

export default App;
