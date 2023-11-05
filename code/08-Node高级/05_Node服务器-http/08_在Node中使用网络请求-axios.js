const axios = require("axios");

//在node中也可以使用axos
//在浏览器中axios时基于XHR封装的，在Node中axios是基于http模块封装的
axios.get("http://localhost:8000").then((res) => {
  console.log(res.data);
});
