const { PaymentCategory } = require('../models/paymentCategory')
//1. arr of data
// 2. link with id

const data = [
    {
        "_id": "5f4890595ec8a7598aa40a01",
        "name": "ADMISSION_FEE",
        "classroom": "5ee454d1e777062dd82ba898",
        "amount": 10000,
        "year": 2020

    },
    {
        "_id": "5f4890595ec8a7598aa40a02",
        "name": "MONTHLY_FEE",
        "classroom": "5ee454d1e777062dd82ba898",
        "amount": 1000,
        "year": 2020
    },
    {
        "_id": "5f4890595ec8a7598aa40a03",
        "name": "ADMISSION_FEE",
        "classroom": "5f326b1c6aaffc26b4afe107",
        "amount": 10000,
        "year": 2020
    },
    {
        "_id": "5f4890595ec8a7598aa40a04",
        "name": "MONTHLY_FEE",
        "classroom": "5f326b1c6aaffc26b4afe107",
        "amount": 1000,
        "year": 2020
    }
]
exports.model = PaymentCategory
exports.data = data