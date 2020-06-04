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
    .remove({id: id})
    .write();
 
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
