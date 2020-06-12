const db = require("../db");
var shortid = require("shortid");

module.exports.books = (req, res) => {
  let books = db.get("books").value();
  res.render("index", { books: books });
};

module.exports.add = (req, res) => {
  res.render("add");
};

module.exports.postAdd = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect('/books');
};

module.exports.view = (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("viewbook", { book: book });
}

module.exports.update = (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("update", { book: book });
}

module.exports.postUpdate = (req, res) => {
  let id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: req.body.newTitle })
    .write();
  res.redirect('/books');
}

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
    res.redirect("/books");
}