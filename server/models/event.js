const Joi = require('joi')
const mongoose = require('mongoose')

let eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    startDate: {
        type: Number,
        required: true
    },
    startMonth: {
        type: Number,
        required: true
    },
    startYear: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    endMonth: {
        type: Number,
        required: true
    },
    endYear: {
        type: Number,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    information:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Information'
    }
},
{timestamps:true})

const Events= mongoose.model('Event', eventSchema)

function validateEvent (events) {
    const schema = {
        title: Joi.string().min(2).max(50).required(),
        startDate: Joi.number().min(1).max(32).required(),
        startYear: Joi.number().min(1999).max(9999).required(),
        startMonth: Joi.number().min(1).max(12).required(),
        endDate: Joi.number().min(1).max(32).required(),
        endYear: Joi.number().min(1999).max(9999).required(),
        endMonth: Joi.number().min(1).max(12).required(),
        startTime: Joi.string().min(2).max(50).required(),
        endTime: Joi.string().min(2).max(50).required(),
        information: Joi.objectId(),
    }

    return Joi.validate(events, schema)
}

function validateSearch (events) {
    const schema = {
        title: Joi.string().min(2).max(50),
        startDate: Joi.number().min(1).max(32),
        startYear: Joi.number().min(1999).max(9999),
        startMonth: Joi.number().min(1).max(12),
        endDate: Joi.number().min(1).max(32),
        endYear: Joi.number().min(1999).max(9999),
        endMonth: Joi.number().min(1).max(12),
        startTime: Joi.string().min(2).max(50),
        endTime: Joi.string().min(2).max(50),
        information: Joi.objectId(),
    }
    return Joi.validate(events, schema)
}

exports.Event = Events
exports.validate= validateEvent
exports.validateSearch= validateSearch