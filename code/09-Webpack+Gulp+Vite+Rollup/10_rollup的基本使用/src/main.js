// import _ from "lodash";
import "./css/index.css";
const bar = () => {
  console.log("bar fun exec");
};

const sum = (num1, num2) => {
  return num1 + num2;
};

const h = document.createElement("h2");

h.textContent = "哈哈哈";

document.body.append(h);

// _.debounce(sum, 100);

exports = {
  sum,
  bar,
};
