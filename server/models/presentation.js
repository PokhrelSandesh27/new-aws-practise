const Joi = require('joi')
const mongoose = require('mongoose')
Joi.objectId = require('joi-objectid')(Joi)

let presentationSchema = new mongoose.Schema({
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
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: String,
    link: String
}, { timestamps: true })

const Presentation = mongoose.model('Presentation', presentationSchema)

function validatePresentation (presentation) {
    const schema = {
        classroom: Joi.objectId().required(),
        subject: Joi.objectId().required(),
        teacher: Joi.objectId().required(),
        topic: Joi.string().required(),
        description: Joi.string(),
        link: Joi.string()
    }

    return Joi.validate(presentation, schema)
}
function validateSearch (presentation) {
    const schema = {
        classroom: Joi.objectId(),
        subject: Joi.objectId(),
        teacher: Joi.objectId(),
        topic: Joi.string(),
        description: Joi.string(),
        link: Joi.string()
    }
    return Joi.validate(presentation, schema)
}

exports.Presentation = Presentation
exports.validate = validatePresentation
exports.validateSearch = validateSearch