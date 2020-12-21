const { BookIssue } = require('../models/bookIssue')
//1. arr of data
// 2. link with id

const data = [
    {
        "fineAmount": 0,
        "isFinePaid": false,
        "_id": "5f8db04a9af04122f627a439",
        "user": "5f16e39ce90c0a3ce036206a",
        "book": "5f38f9a579b22863c7957a79",
        "issueDate": 1603121226573,
        "dueDate": 1603726026573,
        "status": "ISSUED",
        "text": "praj123 Ram Gopal"
    }
]
exports.model = BookIssue
exports.data = data