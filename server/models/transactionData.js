const mongoose = require("mongoose")

const TransactionSchema=mongoose.Schema({
  action: {
    type: String,
    require: true,
  },
  fromAccount: {
    type: String,
    require: true
  },
  toAccount: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  remain: {
    type: Number,
    require: true,
    min: 0
  }
}, { timestamps: true })

module.exports = mongoose.model("Transaction", TransactionSchema)