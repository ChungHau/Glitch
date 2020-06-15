const db = require("../db");
var shortid = require("shortid");

let transactions = db.get("transactions").value();
let users = db.get("users").value();
let books = db.get("books").value();

module.exports.transactions = (req, res) => {
  let usersBorrow = [];
  let booksBorrow = [];
  let statuses = [];
  transactions.forEach(transaction => {
    usersBorrow.push(
      db
        .get("users")
        .find({ id: transaction.userId })
        .value().name
    );
    booksBorrow.push(
      db
        .get("books")
        .find({ id: transaction.bookId })
        .value().title
    );
    statuses.push(transaction.isComplete);
  });

  res.render("transactions", {
    usersBorrow: usersBorrow,
    booksBorrow: booksBorrow,
    transactions: transactions,
    statuses: statuses
  });
};

module.exports.create = (req, res) => {
  res.render("transactions-create", { books: books, users: users });
};

module.exports.postCreate = (req, res) => {
  let id = shortid.generate();
  let bookId = db
    .get("books")
    .find({ title: req.body.bookBorrow })
    .value().id;
  let userId = db
    .get("users")
    .find({ name: req.body.userBorrow })
    .value().id;
  db.get("transactions")
    .push({ userId: userId, bookId: bookId, id: id, isComplete: false })
    .write();
  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  let id = req.params.id;
  db.get("transactions")
    .find({ id: id })
    .assign({ isComplete: true })
    .write();
  res.redirect("/transactions");
};
