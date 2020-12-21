const { ExamReport } = require('../models/examReport')

const data = [
    {
        "_id": "5f28ceb6663c1c2a4c056876",
        "exam": "5f267e1e24b5ab26cc63ff97",
        "student": "5f16e39ce90c0a3ce036206a",
        "totalMarks": 430,
        "result": "PASS",
        "remarks": "Outstanding",
        "gpa": 3.45
    } 
]
exports.model = ExamReport
exports.data = data