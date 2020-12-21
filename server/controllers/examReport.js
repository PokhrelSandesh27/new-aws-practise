const express = require('express')

const { ExamReport, validate  , validateSearch} = require('../models/examReport')

const { getArr } = require('../utils')
const { User } = require('../models/user')
const { Exam } = require('../models/exam')
exports.createExamReport = async (req, res) => {
    const { error, value: examReportReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { student: studentId, exam: examId } = examReportReq

    const exam = await Exam.findById(examId)
    if (!exam) return res.status(400).send('Exam with given ID is not found')

    const student = await User.findById(studentId)
    if (!student) return res.status(400).send('Student with given ID is not found')
    //let examDetail = await ExamDetail.findOne({ name })

    //if (examDetail)
    //    return res.status(400).send(`Exam details ${name} already exists`)

    //if (!getArr(Exam, 'teacher.groups').includes('TEACHER'))
        //return res.status(400).send(`This is not a valid user`)

    examReport = new ExamReport(examReportReq)
    await examReport.save()

    res.send(examReport)
}

exports.getAllExamReports = async (req, res) => {
    const examReports = await ExamReport.find().populate("exam student")
    res.send(examReports)
}

exports.getExamReportById = async (req, res) => {
    const examReport= await ExamReport.findById(req.params.id).populate("exam student")
    if (!examReport) return res.status(400).send('Exam Report with given ID not found')

    res.send(examReport)
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

    const examReport = await ExamReport.find(searchReq).populate("exam student")

    res.send(examReport)
}