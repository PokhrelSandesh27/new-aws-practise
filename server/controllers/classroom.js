const express = require('express')

const { Classroom, validate } = require('../models/classroom')
const { getArr } = require('../utils')

exports.createClassroom = async (req, res) => {
    const { error, value: classroomReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { grade, section } = classroomReq

    let classroom = await Classroom.findOne({ grade, section }).populate('teacher')

    if (classroom)
        return res.status(400).send(`Classroom ${grade}-${section} already exists`)

    //if (!getArr(classroom, 'teacher.groups').includes('TEACHER'))
    //return res.status(400).send(`This is not a valid user`)

    classroom = new Classroom(classroomReq)
    await classroom.save()

    res.send(classroom)
}

exports.getAllClassrooms = async (req, res) => {
    const classrooms = await Classroom.find().populate('teacher')
    res.send(classrooms)
}

exports.getClassroomById = async (req, res) => {
    const classroom = await Classroom.findById(req.params.id).populate('teacher')
    if (!classroom) return res.status(400).send('Classroom with given ID not found')

    res.send(classroom)
}

// exports.classroom_update = async (req, res) => {
//     const classroomReq = req.body
//     //if (error) res.status(400).send(error.details[0].message)
//
//     await Classroom.findByIdAndUpdate(req.params.id, { ...classroomReq })
//     updated_classroom = await Classroom.findById(req.params.id)
//     res.send(updated_classroom)
// }
//
// exports.classroom_delete = async (req, res) => {
//     deleted_classroom = await Classroom.findByIdAndRemove(req.params.id)
//     res.send(deleted_classroom)
// }
