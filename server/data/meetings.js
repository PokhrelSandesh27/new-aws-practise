const { Meeting } = require('../models/meeting')

const data = [
    {
        "classroom":"5ee454d1e777062dd82ba898",
        "lecture":"5ee45bc1d72bbc24389eda44",
        "teacher":"5f16e39ee90c0a3ce036206e",   
        "startTime": 1594734728924
    }
]

exports.model = Meeting
exports.data = data