// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
var todos = ["Đi chợ", "Nấu cơm", "Rửa bát", "Học code tại CodersX"];

app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (req,res) => {
  let q = req.query.q;
  if(q) {
    let matchedTodos = todos.filter(todo => todo.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render("todos/index", {
    todos: matchedTodos
  });
  }
  
  res.render("todos/index", {
    todos: todos
  });
});


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
