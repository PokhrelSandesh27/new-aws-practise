const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    paymentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentCategory',
        required: true
    },
    paymentConfiguration: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentConfiguration'
    },
    scholarshipConfiguration: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarshipConfiguration'
    },
    year: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 4
    },
    month: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    dateTime: Number,
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema)

function validatePayment (payment) {
    const schema = {
        user: Joi.objectId().required(),
        username: Joi.string().required(),
        student: Joi.objectId().required(),
        classroom: Joi.objectId().required(),
        paymentCategory: Joi.objectId().required(),
        year: Joi.number().min(2000).max(2999).required(),
        month: Joi.number().min(1).max(12).required(),
        isPaid: Joi.boolean().required(),
        amount: Joi.number().required(),
    }

    return Joi.validate(payment, schema)
}

function validateSearchPayment (payment) {
    const schema = {
        user: Joi.string(),
        username: Joi.string(),
        student: Joi.objectId(),
        classroom: Joi.objectId(),
        paymentCategory: Joi.objectId(),
        year: Joi.number().min(2000).max(3000),
        month: Joi.number().min(1).max(12),
        isPaid: Joi.boolean(),
        amount: Joi.number(),
        startDate: Joi.number(),
        endDate: Joi.number()
    }

    return Joi.validate(payment, schema)
}

function validateMakePayment (payment) {
    const schema = {
        user: Joi.string(),
        username: Joi.string(),
        student: Joi.objectId(),
        classroom: Joi.objectId(),
        paymentCategory: Joi.objectId(),
        year: Joi.number().min(2000).max(3000),
        month: Joi.number().min(1).max(12),
        startDate: Joi.number(),
        endDate: Joi.number()
    }

    return Joi.validate(payment, schema)
}

function validateGeneratePayments (payment) {
    const schema = {
        paymentConfiguration: Joi.objectId().required(),
        classroom: Joi.objectId().required()
    }

    return Joi.validate(payment, schema)
}

function validateApproveScholarships (payment) {
    const schema = {
        student: Joi.objectId().required(),
        scholarship: Joi.objectId().required()
    }

    return Joi.validate(payment, schema)
}

exports.Payment = Payment
exports.validate = validatePayment
exports.validateSearchPayment = validateSearchPayment
exports.validateMakePayment = validateMakePayment
exports.validateGeneratePayments = validateGeneratePayments
exports.validateApproveScholarships = validateApproveScholarships
