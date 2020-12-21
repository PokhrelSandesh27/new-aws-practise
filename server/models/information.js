const Joi = require('joi')
const mongoose = require('mongoose')

let informationSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    category: {
        type: String,//(Latest News, Notice)
        enum: ['Latest News', 'Notice'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    validDate: {
        type: String,
        required: true
    },
    notifier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{timestamps:true})

const Information= mongoose.model('Information', informationSchema)

function validateInformation (information) {
    const schema = {
        summary: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(2).max(500).required(),
        validDate: Joi.string().required(),
        notifier: Joi.string().min(2).max(255).required()
    }

    return Joi.validate(information, schema)
}
function validateSearch (information) {
    const schema = {
        summary: Joi.string().min(2).max(50),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(2).max(500),
        validDate: Joi.string(),
        notifier: Joi.objectId()
    }

    return Joi.validate(information, schema)
}
exports.Information = Information
exports.validate= validateInformation
exports.validateSearch= validateSearch