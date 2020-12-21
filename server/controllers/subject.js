const express = require('express')

const { Subject, validate } = require('../models/subject')
const { getArr } = require('../utils')

exports.createSubject = async (req, res) => {
    const { error, value: subjectReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { name } = subjectReq

    let subject = await Subject.findOne({ name })

    if (subject)
        return res.status(400).send(`Subject with name ${name} already exists`)

    subject = new Subject(subjectReq)
    await subject.save()

    res.send(subject)
}

exports.getAllSubjects = async (req, res) => {
    const subjects = await Subject.find()
    res.send(subjects)
}

exports.getSubjectById = async (req, res) => {
    const subjects = await Subject.findById(req.params.id)
    if (!subjects) return res.status(400).send('Subject with given ID not found')

    res.send(subjects)
}

// exports.Exam_update = async (req, res) => {
//     const ExamReq = req.body
//     //if (error) res.status(400).send(error.details[0].message)
//
//     await Exam.findByIdAndUpdate(req.params.id, { ...ExamReq })
//     updated_Exam = await Exam.findById(req.params.id)
//     res.send(updated_Exam)
// }
//
// exports.Exam_delete = async (req, res) => {
//     deleted_Exam = await Exam.findByIdAndRemove(req.params.id)
//     res.send(deleted_Exam)
// }
