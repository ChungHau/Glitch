// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
var todos = [
  {id: 0, todo:"Đi chợ"}, 
  {id: 1, todo:"Nấu cơm"},
  {id: 2, todo:"Rửa bát"}, 
  {id: 3, todo:"Học code tại CodersX"}
];

app.get("/", (request, response) => {
  response.render("index");
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

app.post('/todos/create', (req,res) => {
  todos.push(req.body);
  res.redirect('/todos')
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
