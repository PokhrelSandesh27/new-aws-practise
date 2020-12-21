const Joi = require('joi')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    text: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
},
{timestamps:true})


function validateStudent (student) {
    const schema = {
        student: Joi.objectId().required(),
        classroom: Joi.objectId().required(),
    }

    return Joi.validate(student, schema)
}

function validateSearch (student) {
    const schema = {
        student: Joi.objectId(),
        classroom: Joi.objectId(),
        username: Joi.string().min(2).max(50),
        fullname: Joi.string().min(2).max(255),
        text: Joi.string()
    }

    return Joi.validate(student, schema)
}

const Student = mongoose.model('Student', studentSchema)

exports.Student = Student
exports.validate = validateStudent
exports.validateSearch = validateSearch
