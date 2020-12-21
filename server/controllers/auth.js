const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const omit = require('lodash/omit')

const { User, validateAuthUser } = require('../models/user')
const { Student } = require('../models/student')
const { Classroom } = require('../models/classroom')

exports.auth = async (req, res) => {
    const { error, value: authReq } = validateAuthUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { username, password } = authReq

    let user = await User.findOne({ username }).select('+password')
    if (!user) return res.status(400).send('Invalid username or password')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Invalid username or password')

    user = { ...omit(user.toJSON(), ['password', '__v']), token: user.generateToken() }

    if (user.groups.includes('STUDENT')) {
        const studentObj = await Student.findOne({ student: user._id }).populate('classroom')

        const { _id: student, classroom } = studentObj

        if (student) {
            user = { ...user, student, classroom }
        }
    }

    if (user.groups.includes('TEACHER')) {
        const classroomObj = await Classroom.findOne({ teacher: user._id })

        const { _id: classroom } = classroomObj

        if (classroom) {
            user = { ...user, classroom }
        }
    }

    res.send(user)
}
