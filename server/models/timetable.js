const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const timetableSchema = new mongoose.Schema({
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true
        },
        classroom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classroom',
            required: true
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slot',
            required: true
        },
        day: {
            type: String,
            enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            required: true
        },
        link: {
            type: String
        }
    },
    { timestamps: true })

const Timetable = mongoose.model('Timetable', timetableSchema)

function validate (timetable) {
    const schema = {
        subject: Joi.objectId().required(),
        classroom: Joi.objectId().required(),
        teacher: Joi.objectId().required(),
        slot: Joi.objectId().required(),
        day: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').required(),
        link: Joi.string(),
        
    }

    return Joi.validate(timetable, schema)
}

function validateSearch (timetable) {
    const schema = {
        classroom: Joi.objectId(),
        subject: Joi.objectId(),
        teacher: Joi.objectId(),
        slot: Joi.objectId(),
        day: Joi.string(),
        link: Joi.string(),
    }
    return Joi.validate(timetable, schema)
}

exports.Timetable = Timetable
exports.validate = validate
exports.validateSearch = validateSearch
