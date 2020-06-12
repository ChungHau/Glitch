const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const bookRoute = require('./routes/book-route')
const userRoute = require('./routes/user-route')
const transactionRoute = require('./routes/transaction-route')

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/transactions", transactionRoute)



const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
