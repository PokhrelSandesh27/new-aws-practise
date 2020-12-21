const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const omit = require('lodash/omit')

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            select: false
        },
        fullName: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        currentAddress: {
            type: String,
            required: true
        },
        permanentAddress: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        fatherName: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        status: {
            enum: ['INITIAL', 'ACTIVE', 'SUSPEND'],
            type: String,
            default: 'ACTIVE'
        },
        groups: {
            enums: [{ type: String, enum: ['STUDENT', 'TEACHER', 'MANAGEMENT', 'LIBRARIAN'] }],
            type: Array,
        },
        photo: String,
    },
    { timestamps: true })

userSchema.methods.generateToken = function () {
    return jwt.sign(omit(this.toJSON(), ['password', '__v', 'fullName']), process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema)

function validateUser (user) {
    const schema = {
        username: Joi.string().min(2).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        fullName: Joi.string().min(5).max(255).required(),
        currentAddress: Joi.string().required(),
        permanentAddress: Joi.string().required(),
        phone: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255),
        fatherName: Joi.string().min(5).max(255).required(),
        motherName: Joi.string().min(5).max(255).required(),
        photo: Joi.string(),
        status: Joi.string().valid('INITIAL', 'ACTIVE', 'SUSPEND'),
        groups: Joi.array().items(Joi.string().valid('STUDENT', 'TEACHER', 'MANAGEMENT', 'LIBRARIAN')).required()
    }

    return Joi.validate(user, schema, { stripUnknown: true })
}

function validateAuthUser (user) {
    const schema = {
        username: Joi.string().min(2).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema, { stripUnknown: true })
}

function validateSearchUser (user) {
    const schema = {
        username: Joi.string().min(2).max(50),
        status: Joi.string().valid('INITIAL', 'ACTIVE', 'SUSPEND'),
        groups: Joi.array().items(Joi.string().valid('STUDENT', 'TEACHER', 'MANAGEMENT', 'LIBRARIAN')),
        phone: Joi.string().min(5).max(255),
        email: Joi.string().min(5).max(255),
        fatherName: Joi.string().min(5).max(255),
        motherName: Joi.string().min(5).max(255),
    }

    return Joi.validate(user, schema, { stripUnknown: true })
}

exports.User = User
exports.validate = validateUser
exports.validateAuthUser = validateAuthUser
exports.validateSearchUser = validateSearchUser
