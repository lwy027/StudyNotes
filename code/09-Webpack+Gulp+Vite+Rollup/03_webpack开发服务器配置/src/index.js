// import "core-js/stable";
// import "regenerator-runtime/runtime";
import React from "react";
import ReactDom from "react-dom/client";
import App from "./react/App";
import Sum from "./ts/math.ts";
const message = "Hello babel";

console.log(message);

const foo = () => {
  return 10 + 20;
};
foo();

console.log(Sum(10, 30));

const obj = { name: "lwy", age: 20 };

const { name, age } = obj;

const nickname = "lwy";

console.log(nickname.includes("l"));

const root = ReactDom.createRoot(document.querySelector("#root"));

root.render(<App />);
