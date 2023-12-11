import React, { memo, useEffect, useState } from "react";
import axios from "axios";

const App = memo(() => {
  const [counter, setCounter] = useState(0);

  const [list, setList] = useState([]);

  useEffect(() => {
    // axios.get("/api/users/list").then((res) => {
    //   console.log(res.data);
    //   setList(res.data);
    // });
  }, []);

  const add = (num) => {
    setCounter(counter + num);
  };
  return (
    <div>
      <span>当前计数:{counter}</span>
      <button onClick={(e) => add(1)}>+1</button>

      {list.map((item, index) => {
        return <span key={index}>{item.name} </span>;
      })}
    </div>
  );
});

export default App;
