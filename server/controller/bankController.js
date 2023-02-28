//ติดต่อกับฐานข้อมูล /ดำเนินการข้อมูล
const accountData = require("../models/accountData");
const transactionData = require("../models/transactionData");

exports.transaction = (req, res) => {
  const { action, fromAccount, toAccount, amount, remain } = req.body;

  //validate(ตรวจสอบข้อมูล)
  switch (true) {
    case !toAccount:
      return res.status(400).json({ error: "Kindly provide the account number to which you would like to transfer the money." });
      break;
    case !amount:
      return res.status(400).json({ error: "Please provide the amount you would like to transfer." });
      break;
    case amount < 0:
      return res.status(400).json({ error: "Please provide the positive amount." });
      break;
    case remain < 0:
      return res.status(400).json({ error: "Unfortunately, you are not able to withdraw more money than the available balance in your account." });
      break;
    case toAccount !== '1001' && toAccount !== '1002' && toAccount !== '1003':
      return res.status(400).json({ error: "Unfortunately, it seems that the account you're attempting to transfer to does not valid." });
      break;
  }
  //บันทึกข้อมูล
  transactionData.create({ action, fromAccount, toAccount, amount, remain }, (err, transaction) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(transaction);
  });
};

//fecth data account
exports.singleAccount = (req, res) => {
  const { accountNumber } = req.params;
  accountData.findOne({ accountNumber: accountNumber }).exec((err, account) => {
    res.json(account);
  });
};

exports.receiveTransactions = (req, res) => {
  const { accountNumber } = req.params;
  transactionData
    .find({
      $and: [
        {
          $or: [{ action: "Deposit" }, { action: "Receive from others" }],
        },
        {
          toAccount: accountNumber,
        },
      ],
    })
    .exec((err, receive) => {
      res.json(receive);
    });
};

exports.transferTransactions = (req, res) => {
  const { accountNumber } = req.params;

  transactionData
    .find({
      $and: [
        {
          $or: [{ action: "Withdrawn" }, { action: "Transfer to others" }],
        },
        {
          fromAccount: accountNumber,
        },
      ],
    })
    .exec((err, transfer) => {
      res.json(transfer);
    });
};

//update balance
exports.modify = (req, res) => {
  const { accountNumber } = req.params;
  // ส่งข้อมูล => title , content, author
  const { balance } = req.body;
  accountData.findOneAndUpdate({ accountNumber }, { balance }, { new: true }).exec((err, account) => {
    if (err) console.log(err);
    res.json(account);
  });
};
