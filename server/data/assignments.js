const { Assignment } = require('../models/assignment')
//1. arr of data
// 2. link with id

const data = [
    {
        "_id": "5f107ed705b3cf1d60820654",
        "classroom":"5ee454d1e777062dd82ba898",
        "subject": "5f290e4be0bf823ec00ede91",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "topic":"Overview of Operating System",
        "description":"Short question answers in operating system"
    }
]
exports.model = Assignment
exports.data = data


