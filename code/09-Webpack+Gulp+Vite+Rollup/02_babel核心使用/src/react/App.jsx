import React, { memo, useState } from "react";

const App = memo(() => {
  const [counter, setCounter] = useState(0);

  const add = (num) => {
    setCounter(counter + num);
  };
  return (
    <div>
      <span>当前计数:{counter}</span>
      <button onClick={(e) => add(1)}>+1</button>
    </div>
  );
});

export default App;
