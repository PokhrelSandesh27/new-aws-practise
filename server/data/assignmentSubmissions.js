const { AssignmentSubmission } = require('../models/assignmentSubmission')
//1. arr of data
// 2. link with id

const data = [
    {
        "_id": "5f38aadd589425436d6efc6a",
        "assignment": "5f107ed705b3cf1d60820654",
        "student": "5f4ba19c093ec4046d9dbdb1",
        "description": "Assignment submitted for short question answers in operating system."
    }
]
exports.model = AssignmentSubmission
exports.data = data