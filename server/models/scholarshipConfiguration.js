const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const scholarshipConfigurationSchema = new mongoose.Schema({
    
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    discount: {
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

const ScholarshipConfiguration = mongoose.model('ScholarshipConfiguration', scholarshipConfigurationSchema)

function validateScholarshipConfiguration(scholarshipConfiguration) {
    const schema = {
        name: Joi.string().required(),
        paymentCategory: Joi.objectId().required(),
        student: Joi.objectId().required(),
        startDate: Joi.number().required(),
        endDate: Joi.number().required(),
        repetition:Joi.string().valid('ANNUALLY', 'MONTHLY').required(),
        discount: Joi.number().max(100).min(0).required(),
    }
    return Joi.validate(scholarshipConfiguration, schema)
}
function validateSearchScholarshipConfiguration(scholarshipConfiguration) {
    const schema = {
        name: Joi.string(),
        paymentCategory: Joi.objectId(),
        student: Joi.objectId(),
        classroom: Joi.objectId(),
        year: Joi.number(),
        repetition:Joi.string().valid('ANNUALLY', 'MONTHLY'),
        discount: Joi.number().max(100).min(0),
        isGenerated: Joi.boolean()
    }
    return Joi.validate(scholarshipConfiguration, schema)
}
const dateSchema = Joi.object().keys({
    year: Joi.number().required(),
    month: Joi.number().required(),
    date: Joi.number().required()
})
exports.ScholarshipConfiguration = ScholarshipConfiguration
exports.validate = validateScholarshipConfiguration
exports.validateSearchScholarshipConfiguration = validateSearchScholarshipConfiguration