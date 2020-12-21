const Joi = require('joi')
const mongoose = require('mongoose')
Joi.objectId = require('joi-objectid')(Joi)

let assignmentSubmissionSchema = new mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    link: String
}, { timestamps: true })

const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema)

function validateAssignmentSubmission (assignmentSubmission) {
    const schema = {
        assignment: Joi.objectId().required(),
        student: Joi.objectId().required(),
        description: Joi.string(),
        link: Joi.string()
    }

    return Joi.validate(assignmentSubmission, schema)
}
function validateSearch (assignmentSubmission) {
    const schema = {
        assignment: Joi.objectId(),
        student: Joi.objectId(),
        description: Joi.string(),
        link: Joi.string()
    }

    return Joi.validate(assignmentSubmission, schema)
}
exports.AssignmentSubmission = AssignmentSubmission
exports.validate = validateAssignmentSubmission
exports.validateSearch = validateSearch
