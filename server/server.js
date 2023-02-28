const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { transaction, singleAccount, modify, receiveTransactions, transferTransactions } = require("./controller/bankController");
require("dotenv").config();
const authRoute = require("./routes/auth");

const app = express();

//connect cloud database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("connected database"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//manage database
// app.post('/create',create)

//route
app.post("/transaction", transaction);
//fecth account data
app.get("/account/:accountNumber", singleAccount);
//fecth all receive transactions data
app.get("/account/:accountNumber/history/receive", receiveTransactions);
//fecth all transfer transactions data
app.get("/account/:accountNumber/history/transfer", transferTransactions);
//update account balance
app.put("/account/:accountNumber", modify);
//authentication
app.use("/api", authRoute);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`start server in port ${port}`));
