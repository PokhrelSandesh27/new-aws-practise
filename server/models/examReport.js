const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const examReportSchema = new mongoose.Schema({
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
    totalMarks: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    gpa: {
        type: Number,
        required: true
    }
},
{timestamps:true})

const ExamReport = mongoose.model('ExamReport', examReportSchema)

function validateExamReport (examReport) {
    const examReportSchema = {
        exam: Joi.objectId().required(),
        student: Joi.objectId().required(),
        totalMarks: Joi.number().required(),
        result: Joi.string().required(),
        remarks: Joi.string().required(),
        gpa: Joi.number().required()
    }

    return Joi.validate(examReport, examReportSchema)
}
function validateSearch (examReport) {
    const examReportSchema = {
        exam: Joi.objectId(),
        student: Joi.objectId(),
        totalMarks: Joi.number(),
        result: Joi.string(),
        remarks: Joi.string(),
        gpa: Joi.number()
    }

    return Joi.validate(examReport, examReportSchema)
}
exports.ExamReport = ExamReport
exports.validate = validateExamReport
exports.validateSearch = validateSearch