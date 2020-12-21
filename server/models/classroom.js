const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    description: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Classroom = mongoose.model('Classroom', classroomSchema)

function validateClassroom (classroom) {
    const schema = {
        grade: Joi.number().required(),
        section: Joi.string().min(1).max(2).required(),
        description: Joi.string(),
        teacher: Joi.objectId().required()
    }

    return Joi.validate(classroom, schema)
}

exports.Classroom = Classroom
exports.validate = validateClassroom
