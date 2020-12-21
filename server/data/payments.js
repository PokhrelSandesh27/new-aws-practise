const { Payment } = require('../models/payment')
//1. arr of data
// 2. link with id

const data = [
    {
        "_id": "5f489494e1742065e2a42db9",
        "user": "5f16e39ce90c0a3ce036206b",
        "rollNumber":12,
        "paymentCategory":"5f4890595ec8a7598aa40a01",
        "year":2019,
        "month":02,
        "student":"5f4ba19c093ec4046d9dbdb2",
        "classroom":"5f326b1c6aaffc26b4afe107",
        "amount":10000
    }
]
exports.model = Payment
exports.data = data