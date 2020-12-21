const { User } = require('../models/user')

const data = [
    {
        '_id': '5f16e39ce90c0a3ce036206a',
        'username': 'stu_001',
        'password': 'knowispower',
        'fullName': 'Ram Sharma',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464357",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['STUDENT']
    },
    {
        '_id': '5f16e39ce90c0a3ce036206b',
        'username': 'stu_002',
        'password': 'knowispower',
        'fullName': 'Lakshman Prasai',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['STUDENT']
    },
    {
        '_id': '5f16e39ce90c0a3ce036206d',
        'username': 'tea_001',
        'password': 'knowispower',
        'fullName': 'Shreya Dahal',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['TEACHER']
    },
    {
        '_id': '5f16e39ee90c0a3ce036206e',
        'username': 'tea_002',
        'password': 'knowispower',
        'fullName': 'Priyanka Paudel',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['TEACHER']
    },
    {
        '_id': '5f16e39ee90c0a3ce036206f',
        'username': 'mgmt_001',
        'password': 'knowispower',
        'fullName': 'D.B. Koirala',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['MANAGEMENT']
    },
    {
        '_id': '5f16e39ee90c0a3ce0362066',
        'username': 'lib_001',
        'password': 'knowispower',
        'fullName': 'L.B Moktan',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['LIBRARIAN']
    },
    {
        '_id': '5f16e39ee90c0a3ce036206c',
        'username': 'acc_001',
        'password': 'knowispower',
        'fullName': 'Aartha Sharna',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"prajwalgajurel@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['ACCOUNTANT']
    },
    {
        '_id': '5f16e39ee90c0a3ce0362069',
        'username': 'sta_001',
        'password': 'knowispower',
        'fullName': 'Shila Silwal',
        "currentAddress":"Nepal",
        "permanentAddress":"Nepal",
        "phone":"+9779841464727",
        "email":"shila@outlook.com",
        "fatherName":"testee",
        "motherName":"testee",
        'status': 'ACTIVE',
        'groups': ['STAFF']
    }
]

exports.model = User
exports.data = data
