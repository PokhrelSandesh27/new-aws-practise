const Joi = require('joi')
const mongoose = require('mongoose')
Joi.objectId = require('joi-objectid')(Joi)

let attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    dateTime: {
        type: Number,
        required: true
    },
    isPresent: Boolean
}, { timestamps: true })

const Attendance = mongoose.model('Attendance', attendanceSchema)

function validateAttendance (attendance) {
    const schema = {
        user: Joi.objectId().required()
    }

    return Joi.validate(attendance, schema)
}
function validateSearch (attendance) {
    const schema = {
        user: Joi.objectId(),
        classroom: Joi.objectId(),
        dateTime: Joi.number(),
        isPresent: Joi.boolean(),
        startDate: Joi.number(),
        endDate: Joi.number()
    }
    return Joi.validate(attendance, schema)
}
exports.Attendance = Attendance
exports.validate = validateAttendance
exports.validateSearch = validateSearch
