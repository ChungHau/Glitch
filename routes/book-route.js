const express = require("express");
const router = express.Router();
var shortid = require("shortid");

const db = require("../db");

router.get("/", (req, res) => {
  let books = db.get("books").value();
  res.render("index", { books: books });
});

//ADD
router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect('/books');
});

//VIEW
router.get("/:id/view", (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("viewbook", { book: book });
});

//UPDATE
router.get("/:id/update", (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("update", { book: book });
});

router.post("/:id/update", (req, res) => {
  let id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: req.body.newTitle })
    .write();
  res.redirect('/books');
});

//DELETE
router.get("/:id/delete", (req, res) => {
  let id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
    res.redirect("/books");
});

module.exports = router;
