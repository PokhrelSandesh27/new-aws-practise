const express = require('express')
const { v4: uuidv4 } = require('uuid')

const { Timetable, validate, validateSearch } = require('../models/timetable')

const { Classroom } = require('../models/classroom')
const { getArr } = require('../utils')
const { Slot } = require('../models/slot')
const { Subject } = require('../models/subject')
const { User } = require('../models/user')

exports.createTimetable = async (req, res) => {
    const { error, value: timetableReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { subject: subjectId, day, teacher: teacherId, classroom: classroomId, slot: slotId } = timetableReq

    const teacher = await User.findById(teacherId)
    if (!teacher) return res.status(400).send('Teacher with given ID is not found')

    const classroom = await Classroom.findById(classroomId)
    if (!classroom) return res.status(400).send('Classroom with given ID is not found')

    const slot = await Slot.findById(slotId)
    if (!slot) return res.status(400).send('Slot with given ID is not found')

    const subject = await Subject.findById(subjectId)
    if (!subject) return res.status(400).send('Subject with given ID is not found')

    let timetable = await Timetable.findOne({ classroom, day, slot }).populate('classroom teacher slot subject')
    if (timetable) return res.status(400).send('This slot is not empty')

    timetable = new Timetable({ ...timetableReq, link: `${classroom._id}-${subject._id}-${uuidv4()}` })
    await timetable.save()

    res.send(timetable)
}

exports.getAllTimetables = async (req, res) => {
    const timetables = await Timetable.find().populate('classroom teacher slot subject')
    res.send(timetables)
}

exports.getTimetableById = async (req, res) => {
    const timetable = await Timetable.findById(req.params.id).populate('classroom teacher slot subject')
    if (!timetable) return res.status(400).send('Timetable with given ID not found')

    res.send(timetable)
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

exports.searchTimetables = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) res.status(400).send(error.details[0].message)
    //const {username,status,groups} = searchReq
    const timetables = await Timetable.find(searchReq).populate('classroom teacher slot subject')
    res.send(timetables)
}
