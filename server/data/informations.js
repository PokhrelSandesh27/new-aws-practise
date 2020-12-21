

const { Information } = require('../models/information')

const data = [
    {
        "_id": "5f641cd64adc7122184bf0fa",
        "summary": "First Terminal Exam Notice",
        "category": "Notice",
        "description": "First Terminal exam will be held on 20th October 2020.",
        "validDate": "10/11/2020",
        "notifier": "5f16e39ee90c0a3ce036206f",
        "createdAt": "2020-09-18T02:35:02.499Z",
        "updatedAt": "2020-09-18T02:35:02.499Z"
    }
]
exports.model = Information
exports.data = data