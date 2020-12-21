const { PaymentConfiguration } = require('../models/paymentConfiguration')
//1. arr of data
// 2. link with id

const data = [
    {
        "isGenerated": false,
        "_id": "5f7569daee0c5433d38fea42",
        "name": "MONTHLY_FEE_GR_2_2020",
        "paymentCategory": "5f4890595ec8a7598aa40a02",
        "startDate": 1577836800000,
        "endDate": 1609459199999,
        "repetition": "MONTHLY",
        "rule": "DTSTART:20200101T000000Z\nRRULE:UNTIL=20201231T235959Z;FREQ=MONTHLY",
        "classroom": "5ee454d1e777062dd82ba898",
    }
]
exports.model = PaymentConfiguration
exports.data = data