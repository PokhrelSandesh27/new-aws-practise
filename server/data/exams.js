const { Exam } = require('../models/exam')

const data = [
    {
        "_id":"5f267e1e24b5ab26cc63ff97",
        "name":"First Terminal Exam",
        "type":"TERMINAL_EXAM",
        "startDate":"2020/12/20",
        "endDate":"2020/12/30",
        "classroom":"5ee454d1e777062dd82ba898",
        "year":2020,
        "terminal":1
    }
]
exports.model = Exam
exports.data = data