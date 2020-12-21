const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    }
},
{timestamps:true})

const Slot = mongoose.model('Slot', slotSchema)

function validate (slot) {
    const slotSchema = {
        name: Joi.string().required(),
        startTime: Joi.number().required(),
        endTime: Joi.number().required()
    }

    return Joi.validate(slot, slotSchema)
}
function validateSearch (slot) {
    const slotSchema = {
        name: Joi.string(),
        startTime: Joi.number(),
        endTime: Joi.number()
    }
    return Joi.validate(slot, slotSchema)
}
exports.Slot = Slot
exports.validate = validate
exports.validateSearch = validateSearch