const { Classroom } = require('../models/classroom')

const data = [
    {
        "_id":"5ee454d1e777062dd82ba898",
        "grade":"2",
        "section":"A",
        "description":"This is 2-B",
        "teacher":"5f16e39ce90c0a3ce036206d"
    },
    {
        "_id":"5f326b1c6aaffc26b4afe107",
        "grade":"3",
        "section":"A",
        "description":"This is 3-A",
        "teacher":"5f16e39ee90c0a3ce036206f"
    },
    {
        "_id":"5f42a458721d74294082dfec",
        "grade":"4",
        "section":"A",
        "description":"This is 4-A",
        "teacher":"5f16e39ee90c0a3ce036206f"
    }
]
exports.model = Classroom
exports.data = data
