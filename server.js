const express = require("express");
const app = express();
var shortid = require("shortid");
const bodyParser = require("body-parser");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  let books = db.get("books").value();
  res.render("index", { books: books });
});

//ADD
app.get("/books/add", (req, res) => {
  res.render("add");
});

app.post("/books/add", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/");
});

//VIEW
app.get("/books/:id/view", (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("viewbook", { book: book });
});

//UPDATE
app.get("/books/:id/update", (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("update", { book: book });
});

app.post("/books/:id/update", (req, res) => {
  let id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: req.body.newTitle })
    .write();
  res.redirect("/");
});

//DELETE
app.get("/books/:id/delete", (req, res) => {
  let id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
});

//CRUD users
//Show users
app.get("/users", (req, res) => {
  let users = db.get("users").value();
  res.render("users", { users: users });
});

//View User
app.get("/users/:id/view", (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user-view", { user: user });
});

//Create user
app.get("/users/create", (req, res) => {
  res.render("user-create");
});

app.post("/users/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

//Update user
app.get("/users/:id/update", (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user-update", { user: user });
});

app.post("/users/:id/update", (req, res) => {
  let id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: req.body.newName }, { age: req.body.newAge })
    .write();
  res.redirect("/");
});

//DELETE
app.get("/users/:id/delete", (req, res) => {
  let id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
