const Joi = require('joi')
const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: false
    },
},
{timestamps:true})

const Message = mongoose.model('Message', messageSchema)

function validateMessage (message) {
    const schema = {
        sender: Joi.objectId().required(),
        receiver: Joi.objectId().required(),
        content: Joi.string().required(),
        parent: Joi.objectId(),
    }
    return Joi.validate(message, schema)
}

function validateSearchMessage (message) {
    const schema = {
        sender: Joi.objectId(),
        receiver: Joi.objectId(),
        content: Joi.string(),
        parent: Joi.objectId(),
    }
    return Joi.validate(message, schema)
}
exports.Message = Message
exports.validateSearchMessage = validateSearchMessage
exports.validate = validateMessage
//validation required