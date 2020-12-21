const { QuestionSet } = require('../models/questionSet')

const data = [
    {
        "questionSet": [
                {
                    "questionNumber": "q1",
                    "question": "Your question 01 ?",
                    "options": [
                        { "value": 1, "display": "Answer 01" },
                        { "value": 2, "display": "Answer 02" },
                        { "value": 3, "display": "Answer 03" },
                        { "value": 4, "display": "Answer 04" }
                    ],
                    "correctAnswer": 2,
                    "studentAnswer": 0
                },
                {
                    "questionNumber": "q2",
                    "question": "Your question 02 ?",
                    "options": [
                        { "value": 1, "display": "Answer 01" },
                        { "value": 2, "display": "Answer 02" },
                        { "value": 3, "display": "Answer 03" },
                        { "value": 4, "display": "Answer 04" }
                    ],
                    "correctAnswer": 2,
                    "studentAnswer": 0
                }
            ],
            "_id": "5fb3edad942d402b76cc47c0"
        }
]  
exports.model = QuestionSet
exports.data = data