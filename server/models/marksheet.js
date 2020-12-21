const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const marksheetSchema = new mongoose.Schema({
    examDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExamDetail',
        required: true
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    theoryMarks: {
        type: Number,
        required: true
    },
    pracMarks: {
        type: Number,
        required: true
    }
},
{timestamps:true})

const Marksheet = mongoose.model('marksheet', marksheetSchema)

function validateMarksheet (marksheet) {
    const marksheetSchema = {
        exam: Joi.objectId().required(),
        examDetail: Joi.objectId().required(),
        student: Joi.objectId().required(),
        theoryMarks: Joi.number().required(),
        pracMarks: Joi.number().required()
    }

    return Joi.validate(marksheet, marksheetSchema)
}
function validateSearch(marksheet) {
    const marksheetSchema = {
        exam: Joi.objectId(),
        examDetail: Joi.objectId(),
        student: Joi.objectId(),
        theoryMarks: Joi.number(),
        pracMarks: Joi.number()
    }

    return Joi.validate(marksheet, marksheetSchema)
}
exports.Marksheet = Marksheet
exports.validate = validateMarksheet
exports.validateSearch = validateSearch