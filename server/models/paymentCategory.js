const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const paymentCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    year: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 4
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const PaymentCategory = mongoose.model('PaymentCategory', paymentCategorySchema)

function validatePaymentCategory (paymentCategory) {
    const schema = {
        name: Joi.string().required(),
        classroom: Joi.objectId().required(),
        amount: Joi.number().required(),
        year: Joi.number().required(),
    }
    return Joi.validate(paymentCategory, schema)
}

function validateSearchPaymentCategory (paymentCategory) {
    const schema = {
        name: Joi.string(),
        classroom: Joi.objectId(),
        year: Joi.number()
    }

    return Joi.validate(paymentCategory, schema)
}

exports.PaymentCategory = PaymentCategory
exports.validate = validatePaymentCategory
exports.validateSearchPaymentCategory = validateSearchPaymentCategory
