const jwt = require('jsonwebtoken')
exports.login=(req,res)=>{
    const {accountNumber, password} = req.body
    res.json({
        accountNumber, password
    })
}