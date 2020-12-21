const express = require('express')

const {Marksheet, validate , validateSearch} = require('../models/marksheet')
const { getArr } = require('../utils')
const { ExamDetail } = require('../models/examDetail')
const { User } = require('../models/user')

exports.createMarksheet = async (req, res) => {
    const { error, value: marksheetReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { examDetail: examDetailId, student: studentId } = marksheetReq
    const exam = await ExamDetail.findById(examDetailId)
    if (!exam) return res.status(400).send('Exam Detail with given ID is not found')

    const student = await User.findById(studentId)
    if (!student) return res.status(400).send('Student with given ID is not found')
    //let examDetail = await ExamDetail.findOne({ name })
    //TODO: SHOULD NOT BE ABLE TO UPDATE 
    
    //if (examDetail)
    //    return res.status(400).send(`Exam details ${name} already exists`)

    //if (!getArr(Exam, 'teacher.groups').includes('TEACHER'))
        //return res.status(400).send(`This is not a valid user`)

    marksheet = new Marksheet(marksheetReq)
    await marksheet.save()

    res.send(marksheet)
}

exports.getAllMarksheets = async (req, res) => {
    const marksheet = await Marksheet.find().populate('exam examDetail student')
    res.send(marksheet)
}

exports.getMarksheetById = async (req, res) => {
    const marksheet = await Marksheet.findById(req.params.id).populate('exam examDetail student')
    if (!marksheet) return res.status(400).send('Marksheet with given ID not found')

    res.send(marksheet)
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
exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const marksheets = await Marksheet.find(searchReq).populate('exam examDetail student')

    res.send(marksheets)
}