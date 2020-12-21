const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const receiptGenerationSchema = new mongoose.Schema({
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
    isGenerated: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true })

const ReceiptGeneration = mongoose.model('ReceiptGeneration', receiptGenerationSchema)

function validateReceipt(receiptGeneration) {
    const schema = {
        year: Joi.number().min(2000).max(3000).required(),
        month: Joi.number().min(1).max(12).required(),
        isGenerated: Joi.boolean().required(),
    }
    return Joi.validate(receiptGeneration, schema)
}

function validateSearchReceipt(receiptGeneration) {
    const schema = {
        year: Joi.number().min(2000).max(3000),
        month: Joi.number().min(1).max(12),
        isGenerated: Joi.boolean().required(),
    }

    return Joi.validate(receiptGeneration, schema)
}

exports.ReceiptGeneration = ReceiptGeneration
exports.validate = validateReceiptGeneration
exports.validateSearchReceiptGeneration = validateSearchReceiptGeneration