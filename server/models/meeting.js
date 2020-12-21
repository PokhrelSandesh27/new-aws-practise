const Joi = require('joi')
const mongoose = require('mongoose')

let meetingSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    lecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheduleinfo: {
        type: Array,
        required: true
    },
    startTime: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    link: {
        type: String,
        minlength: 1,
        maxlength: 255
    }

},
{timestamps:true})

const Meeting = mongoose.model('Meeting', meetingSchema)

function validateMeeting (meeting) {
    const schema = {
        classroom: Joi.objectId().required(),
        lecture: Joi.objectId().required(),
        teacher: Joi.objectId().required(),
        scheduleinfo: Joi.array(),
        startTime: Joi.number().required()
    }
    return Joi.validate(meeting, schema)
}
function validateSearchMeeting (meeting) {
    const schema = {
        classroom: Joi.objectId(),
        lecture: Joi.objectId(),
        teacher: Joi.objectId(),
        //startTime: Joi.number()
    }
    return Joi.validate(meeting, schema)
}
exports.Meeting = Meeting
exports.validateSearchMeeting = validateSearchMeeting
exports.validate = validateMeeting
//validation required