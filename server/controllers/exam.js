const express = require('express')
const { Classroom } = require('../models/classroom')

const { Exam, validate , validateSearch} = require('../models/exam')
const { getArr } = require('../utils')

exports.createExam = async (req, res) => {
    //if inter classroom exam change is released to true
    const { error, value: examReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name, classroom: classroomID, terminal, year,type } = examReq

    let classroom=Classroom.findById(classroomID);
    const{grade,section}=classroom
    let exam = await Exam.findOne({ name, classroom:classroomID, terminal, year })
    if (exam)
        return res.status(400).send(`Exam ${name}, ${year} already exists for class ${grade}-${section}`)

    if(type=="ASSESSMENT")
        isReleased=true
    else
        isReleased=false
    //if (!getArr(Exam, 'teacher.groups').includes('TEACHER'))
        //return res.status(400).send(`This is not a valid user`)

    exam = new Exam({...examReq,isReleased:isReleased})
    await exam.save()

    res.send(exam)
}

exports.getAllExams = async (req, res) => {
    const exams = await Exam.find()
    res.send(exams)
}

exports.getExamById = async (req, res) => {
    const exam = await Exam.findById(req.params.id)
    if (!exam) return res.status(400).send('Exam with given ID not found')

    res.send(exam)
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

    const exam = await Exam.find(searchReq)

    res.send(exam)
}