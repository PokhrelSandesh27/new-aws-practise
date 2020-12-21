const Joi = require('joi')
const mongoose = require('mongoose')

let alumniSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2000
    },
    batch: {
        type: Number,
        required: true
    },
    photo: String
},
{timestamps:true})

const Alumni= mongoose.model('Alumni', alumniSchema)

function validateAlumni (alumni) {
    const schema = {
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(2000).required(),
        batch: Joi.number().required(),
    }
    return Joi.validate(alumni, schema)
}

function validateSearch (alumni) {
    const schema = {
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().min(2).max(255),
        batch: Joi.number(),
    }

    return Joi.validate(alumni, schema)
}
exports.Alumni = Alumni
exports.validate= validateAlumni
exports.validateSearch= validateSearch
//validation required