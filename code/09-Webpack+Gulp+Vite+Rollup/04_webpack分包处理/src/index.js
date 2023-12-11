const message = "Hello World";
import axios from "axios";
import React from "react";
import ReactDom from "react-dom/client";
import App from "./react/App";
console.log(message);
import "./css/index.css";
function sum(num1, num2) {
  return num1 + num2;
}

// axios.get("http://123.207.32.32:8000/home/mu1tidata").then((res) => {
//   console.log(res);
// });
// import "./router/about";
// import "./router/category";

const btn1 = document.createElement("button");
const btn2 = document.createElement("button");

btn1.textContent = "关于";
btn2.textContent = "分类";

document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = () => {
  import(
    /*webpackChunkName:"about"*/ /*webpackPrefetch:true*/ "./router/about"
  );
};
btn2.onclick = () => {
  import(
    /*webpackChunkName:"category"*/ /*webpackPreload:true*/ "./router/category"
  );
};

const root = ReactDom.createRoot(document.querySelector("#root"));

root.render(<App />);

sum(20, 50);
