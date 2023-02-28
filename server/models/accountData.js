const mongoose = require("mongoose")

const AccountSchema=mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  }
})

// create default user instead of a register system.
// const Account = mongoose.model("Account", AccountSchema);

// const accounts = [
//   {
//     accountNumber: "1001",
//     accountHolder: "Sahachai Wongwattana",
//     password:"Wj&8Pc#vMn5Z",
//     balance: 1000
//   },
//   {
//     accountNumber: "1002",
//     accountHolder: "Siriporn Prasertsang",
//     password:"g7h#G9fLm4Np",
//     balance: 500
//   },
//   {
//     accountNumber: "1003",
//     accountHolder: "Supaporn Chalermphongphan",
//     password:"s6U*Wx@tKv2D",
//     balance: 1500
//   }
// ];

// Account.create(accounts)

module.exports = mongoose.model("Account", AccountSchema)