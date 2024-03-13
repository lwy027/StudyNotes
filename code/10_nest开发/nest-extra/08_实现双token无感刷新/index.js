const res = await fetch("http://localhost:4000/user/login", {
  method: "POST",
  body: { username: "李四", password: "222222" },
});

console.log(res);
localStorage.setItem("access_token", res.data.access_token);
localStorage.setItem("refresh_token", res.data.refresh_token);
