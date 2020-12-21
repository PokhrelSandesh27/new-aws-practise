const Joi = require('joi')
const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},
{timestamps:true})


function validateSubject (subject) {
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(subject, schema)
}

function validateSearch (subject) {
    const schema = {
        name: Joi.string()
    }

    return Joi.validate(subject, schema)
}

const Subject = mongoose.model('Subject', subjectSchema)

exports.Subject = Subject
exports.validate = validateSubject
exports.validateSearch = validateSearch
