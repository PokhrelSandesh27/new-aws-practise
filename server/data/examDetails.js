const { ExamDetail } = require('../models/examDetail')

const data = [
    {
        "_id": "5f28cd8ba9c8de3ad0cc1ee9",
        "exam": "5f267e1e24b5ab26cc63ff97",
        "classroom": "5ee454d1e777062dd82ba898",
        "subject": "5f290e4be0bf823ec00ede91",
        "theoryFullMarks": 75,
        "pracFullMarks": 25,
        "theoryPassMarks": 35,
        "pracPassMarks": 15,
        "date": "2020/08/21",
        "startTime": 234092309482,
        "endTime": 23409235834758,
        "invigilator": "5f16e39ee90c0a3ce036206e",
        "examiner": "5f16e39ce90c0a3ce036206d", 
        "grader": "5f16e39ce90c0a3ce036206d",
        "questionSet": "5fb3edad942d402b76cc47c0"
    }
]
exports.model = ExamDetail
exports.data = data