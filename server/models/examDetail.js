const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const examDetailSchema = new mongoose.Schema({
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    theoryFullMarks: {
        type: Number,
        required: true
    },
    pracFullMarks: {
        type: Number,
        required: true
    },
    theoryPassMarks: {
        type: Number,
        required: true
    },
    pracPassMarks: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    invigilator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    examiner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet',
        required: false
    }
},
{timestamps:true})

const ExamDetail = mongoose.model('ExamDetail', examDetailSchema)

function validateExamDetail (examDetail) {
    const examDetailSchema = {
        exam: Joi.objectId().required(),
        classroom: Joi.objectId().required(),
        subject: Joi.objectId().required(),
        theoryFullMarks: Joi.number().required(),
        pracFullMarks: Joi.number().required(),
        theoryPassMarks: Joi.number().required(),
        pracPassMarks: Joi.number().required(),
        date: Joi.string().required(),
        startTime: Joi.number().required(),
        endTime: Joi.number().required(),
        invigilator: Joi.objectId().required(),
        examiner: Joi.objectId().required(), 
        grader: Joi.objectId().required(),
        questionSet: Joi.objectId()
    }
    return Joi.validate(examDetail, examDetailSchema)
}
function validateSearch (examDetail) {
    const examDetailSchema = {
        exam: Joi.objectId(),
        classroom: Joi.objectId(),
        subject: Joi.objectId(),
        theoryFullMarks: Joi.number(),
        pracFullMarks: Joi.number(),
        theoryPassMarks: Joi.number(),
        pracPassMarks: Joi.number(),
        date: Joi.string(),
        startTime: Joi.number(),
        endTime: Joi.number(),
        invigilator: Joi.objectId(),
        examiner: Joi.objectId(), 
        grader: Joi.objectId(),
        questionSet: Joi.objectId()
    }

    return Joi.validate(examDetail, examDetailSchema)
}
function validateAddQuestionSet (examDetail) {
    const examDetailSchema = {
        questionSet: Joi.objectId().required()
    }

    return Joi.validate(examDetail, examDetailSchema)
}
exports.ExamDetail = ExamDetail
exports.validate = validateExamDetail
exports.validateSearch = validateSearch
exports.validateAddQuestionSet= validateAddQuestionSet