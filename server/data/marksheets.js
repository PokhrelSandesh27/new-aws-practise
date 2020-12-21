const { Marksheet } = require('../models/marksheet')

const data = [
    {
        "_id": "5f28d1c433675d3b2cb43a18",
        "exam":"5f267e1e24b5ab26cc63ff97",
        "examDetail": "5f28cd8ba9c8de3ad0cc1ee9",
        "student": "5f16e39ce90c0a3ce036206a",
        "theoryMarks": 68,
        "pracMarks": 22
    }
]
exports.model = Marksheet
exports.data = data