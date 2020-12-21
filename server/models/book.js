const Joi = require('joi')
const mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    subtitle: {
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
    author: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    link: String,
    coverLink: String
},
{timestamps:true})

const Book= mongoose.model('Book', bookSchema)

function validateBook (book) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        subtitle: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(2000).required(),
        author: Joi.string().min(2).max(255).required(),
    }

    return Joi.validate(book, schema)
}
function validateSearch (book) {
    const schema = {
        name: Joi.string().min(2).max(50),
        subtitle: Joi.string().min(2).max(255),
        description: Joi.string().min(2).max(255),
        author: Joi.string().min(2).max(255)
    }

    return Joi.validate(book, schema)
}
exports.Book = Book
exports.validate= validateBook
exports.validateSearch= validateSearch
//validation required