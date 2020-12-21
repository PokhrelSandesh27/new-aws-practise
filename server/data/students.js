const { Student } = require('../models/student')

const data = [
    {
        "_id":"5f4ba19c093ec4046d9dbdb1",
        "student":"5f16e39ce90c0a3ce036206a",
        "classroom":"5ee454d1e777062dd82ba898",
        'username': 'stu_001',
        'fullName': 'Ram Sharma',
        'text': 'stu_001 Ram Sharma'
    },
    {
        "_id":"5f4ba19c093ec4046d9dbdb2",
        "student":"5f16e39ce90c0a3ce036206b",
        "classroom":"5f326b1c6aaffc26b4afe107",
        'username': 'stu_002',
        'fullName': 'Lakshman Prasai',
        'text': 'stu_002 Lakshman Prasai'
    }

]

exports.model = Student
exports.data = data
