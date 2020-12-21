const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const paymentConfigurationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    paymentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentCategory',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    year: Number,
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    repetition: {
        type: String,
        enum: ['ANNUALLY', 'MONTHLY'],
        required: true
    },
    rule: String,
    isGenerated: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const PaymentConfiguration = mongoose.model('PaymentConfiguration', paymentConfigurationSchema)

function validatePaymentConfiguration (paymentConfiguration) {
    const schema = {
        name: Joi.string().required(),
        paymentCategory: Joi.objectId().required(),
        startDate: Joi.number().required(),
        endDate: Joi.number().required(),
        repetition: Joi.string().valid('ANNUALLY', 'MONTHLY').required(),
    }

    return Joi.validate(paymentConfiguration, schema)
}

function validateSearchPaymentConfiguration (paymentConfiguration) {
    const schema = {
        name: Joi.string(),
        paymentCategory: Joi.objectId(),
        classroom: Joi.objectId(),
        year: Joi.number(),
        repetition: Joi.string().valid('ANNUALLY', 'MONTHLY'),
        isGenerated: Joi.boolean()
    }

    return Joi.validate(paymentConfiguration, schema)
}

const dateSchema = Joi.object().keys({
    year: Joi.number().required(),
    month: Joi.number().required(),
    date: Joi.number().required()
})

exports.PaymentConfiguration = PaymentConfiguration
exports.validate = validatePaymentConfiguration
exports.validateSearchPaymentConfiguration = validateSearchPaymentConfiguration
