const { Message } = require('../models/message')

const data = [
    {
        "_id": "5f539f677a056b3be338f155",
        "sender":"5f16e39ce90c0a3ce036206a",
        "receiver":"5f16e39ce90c0a3ce036206b",
        "content":"Hello"
    },
    {
        "_id": "5f6a0d386893112949d012a0",
        "sender": "5f16e39ce90c0a3ce036206b",
        "receiver": "5f16e39ce90c0a3ce036206a",
        "content": "Hi",
        "parent": "5f539f677a056b3be338f155"
    }
]

exports.model = Message
exports.data = data