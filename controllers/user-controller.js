const db = require("../db");
var shortid = require("shortid");

module.exports.users = (req, res) => {
  let users = db.get("users").value();
  res.render("users", { users: users });
};
  
module.exports.view = (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user-view", { user: user });
};
  
module.exports.create = (req, res) => {
  res.render("user-create");
};
  
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};
  
module.exports.update = (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("user-update", { user: user });
  res.redirect("/users");

};

module.exports.postUpdate = (req, res) => {
  let id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: req.body.newName }, { age: req.body.newAge })
    .write();
  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};