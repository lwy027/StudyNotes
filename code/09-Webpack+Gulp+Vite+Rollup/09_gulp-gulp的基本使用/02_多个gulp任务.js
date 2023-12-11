const { series } = require("gulp");
const { parallel } = require("gulp");

const foo1 = (cb) => {
  setTimeout(() => {
    console.log("foo1 exec~");
  }, 1000);
  cb();
};
const foo2 = (cb) => {
  setTimeout(() => {
    console.log("foo2 exec~");
  }, 3000);
  cb();
};
const foo3 = (cb) => {
  setTimeout(() => {
    console.log("foo3 exec~");
  }, 3000);
  cb();
};
const seriesFoo = series(foo1, foo2, foo3); //foo2,foo1,foo3
const parallelFoo = series(foo1, foo2, foo3); //foo2,foo1,foo3
module.exports = {
  seriesFoo,
  parallelFoo,
};
