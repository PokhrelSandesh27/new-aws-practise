const Joi = require('joi')
const mongoose = require('mongoose')

let bookIssueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    issueDate: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Number,
        required: true
    },
    returnDate: {
        type: Number
    },
    status: {
        type: String,
        enum: ['ISSUED', 'RETURNED','OVERDUE'],
        required: true
    },
    fineAmount: {
        type: Number,
        default: 0
    },
    isFinePaid: {
        type: Boolean,
        default: false
    },
},
{timestamps:true})

const BookIssue= mongoose.model('BookIssue', bookIssueSchema)

function validateBookIssue (bookIssue) {
    const schema = {
        user: Joi.objectId().required(),
        book: Joi.objectId().required(),
        issueDate: Joi.number(),
        dueDate: Joi.number(),
        returnDate: Joi.number(),
        status: Joi.string().valid('ISSUED', 'RETURNED','OVERDUE'),
        text: Joi.string(),
        finePaymentDate: Joi.number(),
        fineAmount: Joi.number(),
        isFinePaid: Joi.boolean(),
    }

    return Joi.validate(bookIssue, schema)
}
function validateSearch (book) {
    const schema = {
        user: Joi.objectId(),
        book: Joi.objectId(),
        issueDate: Joi.number(),
        dueDate: Joi.number(),
        returnDate: Joi.number(),
        status: Joi.string().valid('ISSUED', 'RETURNED','OVERDUE'),
        text: Joi.string(),
        isFinePaid: Joi.boolean()
    }

    return Joi.validate(book, schema)
}
exports.BookIssue = BookIssue
exports.validate= validateBookIssue
exports.validateSearch= validateSearch
//validation required