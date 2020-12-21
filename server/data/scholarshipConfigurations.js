const { ScholarshipConfiguration } = require('../models/scholarshipConfiguration')
//1. arr of data
// 2. link with id

const data = [
    {
        "isGenerated": false,
        "_id": "5f756df29330c235ee505cad",
        "name": "MONTHLY_FEE_GR_2_2020_FIRST_SCHOLARSHIP",
        "paymentCategory": "5f4890595ec8a7598aa40a02",
        "student": "5f4ba19c093ec4046d9dbdb1",
        "user":"5f16e39ce90c0a3ce036206a",
        "classroom":"5ee454d1e777062dd82ba898",
        "startDate": 1577836800000,
        "endDate": 1609459199999,
        "repetition": "MONTHLY",
        "discount": 50,
        "rule": "DTSTART:20200101T000000Z\nRRULE:UNTIL=20201231T235959Z;FREQ=MONTHLY",
    }
]
exports.model = ScholarshipConfiguration
exports.data = data