const express = require('express')

const { ExamDetail, validate , validateSearch,validateAddQuestionSet,validateHasAttended } = require('../models/examDetail')
const { getArr } = require('../utils')
const { Classroom } = require('../models/classroom')
const { Subject } = require('../models/subject')
const { Exam } = require('../models/exam')
const { User } = require('../models/user')
const { QuestionSet } = require('../models/questionSet')
const { Marksheet } = require('../models/marksheet')
exports.createExamDetail = async (req, res) => {
    const { error, value: examDetailReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    const { subject: subjectId, exam: examId, classroom: classroomId, invigilator: invigilatorId, examiner:examinerId, grader: graderId } = examDetailReq

    const exam = await Exam.findById(examId)
    if (!exam) return res.status(400).send('Exam with given ID is not found')

    const classroom = await Classroom.findById(classroomId)
    if (!classroom) return res.status(400).send('Classroom with given ID is not found')

    const subject = await Subject.findById(subjectId)
    if (!subject) return res.status(400).send('Subject with given ID is not found')

    const invigilator = await User.findById(invigilatorId)
    if (!invigilator) return res.status(400).send('Invigilator with given ID is not found')

    const examiner = await User.findById(examinerId)
    if (!examiner) return res.status(400).send('Examiner with given ID is not found')

    const grader = await User.findById(graderId)
    if (!grader) return res.status(400).send('Grader with given ID is not found')
    //let examDetail = await ExamDetail.findOne({ name })

    //if (examDetail)
    //    return res.status(400).send(`Exam details ${name} already exists`)

    //if (!getArr(Exam, 'teacher.groups').includes('TEACHER'))
        //return res.status(400).send(`This is not a valid user`)

    examDetail = new ExamDetail(examDetailReq)
    await examDetail.save()

    res.send(examDetail)
}

exports.getAllExamDetails = async (req, res) => {
    const examDetails = await ExamDetail.find().populate('exam classroom subject invigilator examiner grader questionSet')
    res.send(examDetails)
}

exports.getExamDetailById = async (req, res) => {
    const examDetail = await ExamDetail.findById(req.params.id).populate('exam classroom subject invigilator examiner grader questionSet')
    if (!examDetail) return res.status(400).send('Exam Detail with given ID not found')

    res.send(examDetail)
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
    const examDetail = await ExamDetail.find(searchReq).populate('exam classroom subject invigilator examiner grader questionSet')
    res.send(examDetail)
}

 exports.addQuestionSet = async (req, res) => {
    const { error, value: questionReq } = validateAddQuestionSet(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { questionSet: questionId } = questionReq

     const question=await QuestionSet.findById(questionId)
     if (!question) return res.status(400).send('Question Set with given ID is not found')
     const questionID=(await question)._id
     await ExamDetail.findByIdAndUpdate(req.params.id, {questionSet:questionID} )
     examDetail = await ExamDetail.findById(req.params.id)
     res.send(examDetail)
}

exports.hasAttended = async (req, res) => {
    const marksheet = await Marksheet.findOne({student:req.params.student,examDetail:req.params.examDetail})
    if (!marksheet) return res.status(400).send(false)
    res.status(200).send(true)
}