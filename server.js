const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/todos", (req, res) => {
  let q = req.query.q;
  if (q) {
    let matchedTodos = db
      .get("todos")
      .value()
      .filter(
        todo => todo.content.toLowerCase().indexOf(q.toLowerCase()) !== -1
      );
    res.render("todos/index", {
      todos: matchedTodos
    });
  }
  res.render("todos/index", {
    todos: db.get("todos").value()
  });
});

app.get("/todos/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get('todos')
    .remove({ id: id })
    .write();
  res.redirect("/todos");
});  

app.post("/todos/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("todos")
    .push(req.body)
    .write();
  res.redirect("/todos");
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
