const { Presentation } = require('../models/presentation')
//1. arr of data
// 2. link with id

const data = [
    {
        "_id": "5f38bd7a6027e14d72d1e5fd",
        "classroom":"5ee454d1e777062dd82ba898",
        "subject": "5f290e4be0bf823ec00ede91",
        "teacher": "5f16e39ce90c0a3ce036206d",
        "topic": "Eating Water",
        "description": "This is a presentation for Eating water"
    }
]
exports.model = Presentation
exports.data = data