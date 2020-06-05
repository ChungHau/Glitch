const express = require("express");
const router = express.Router()
var shortid = require("shortid");

const db = require('../db')

router.get("/", (req, res) => {
  let users = db.get("users").value();
  res.render("users", { users: users });
});

//View User
router.get("/:id/view", (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user-view", { user: user });
});

//Create user
router.get("/create", (req, res) => {
  res.render("user-create");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

//Update user
router.get("/:id/update", (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user-update", { user: user });
  res.redirect("/users");

});

router.post("/:id/update", (req, res) => {
  let id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: req.body.newName }, { age: req.body.newAge })
    .write();
  res.redirect("/users");
});

//DELETE
router.get("/:id/delete", (req, res) => {
  let id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});

module.exports = router;
