const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['TERMINAL_EXAM', 'ASSESSMENT'],
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    isReleased: {
        type: Boolean,
        default: false
    },
    terminal:{
        type: Number,
        default:0
    },
    year:{
        type: Number,
        required: true
    },
},
{timestamps:true})

const Exam = mongoose.model('Exam', examSchema)

function validateExam (exam) {
    const examSchema = {
        name: Joi.string().required(),
        type: Joi.string().valid('TERMINAL_EXAM', 'ASSESSMENT').required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        classroom: Joi.objectId().required(),
        isReleased: Joi.boolean(),
        terminal: Joi.number(),
        year: Joi.number().required(),
    }

    return Joi.validate(exam, examSchema)
}
function validateSearch (exam) {
    const examSchema = {
        name: Joi.string(),
        type: Joi.string().valid('TERMINAL_EXAM', 'ASSESSMENT'),
        startDate: Joi.string(),
        endDate: Joi.string(),
        classroom: Joi.objectId().required(),
        isReleased: Joi.boolean(),
        terminal: Joi.number(),
        year: Joi.number(),
    }

    return Joi.validate(exam, examSchema)
}
exports.Exam = Exam
exports.validate = validateExam
exports.validateSearch = validateSearch