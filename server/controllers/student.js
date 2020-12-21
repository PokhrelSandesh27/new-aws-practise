const express = require('express')
const omit = require('lodash/omit')

const { Student, validate, validateSearch } = require('../models/student')
const { Classroom } = require('../models/classroom')
const { User } = require('../models/user')

exports.createStudent = async (req, res) => {
    const { error, value: studentReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { classroom: classroomId, student: studentId } = studentReq

    const classroom = await Classroom.findById(classroomId)
    if (!classroom) return res.status(400).send('Classroom with given ID is not found')

    const user = await User.findById(studentId)
    if (!user) return res.status(400).send('Student with given ID is not found')
    const {username,fullName}=user
    let student = await Student.findOne({ student:studentId })
    if (student) return res.status(400).send('Student is already attached to a classroom')

    text=username+" "+fullName

    student = new Student({...studentReq,username:username,fullName:fullName,text:text})
    await student.save()

    res.send(student)
}

exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const {text} =searchReq
    const search = {
        ...omit(searchReq, 'text'),  
    }

    if (text) {
        search.text= { $regex: text, $options: 'i' }
    }

    students = await Student.find(search).populate('student classroom ')
    res.send(students)
}

exports.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id).populate('student classroom')
    if (!student) return res.status(400).send('Student with given ID not found')

    res.send(student)
}

// exports.student_classroom_update=async (req,res)=>{
//     const student_classroomReq=req.body
//     //if (error) res.status(400).send(error.details[0].message)
//     const { classroomid, studentarray } = student_classroomReq
//     if (classroomid) await Studentclassroom.findByIdAndUpdate(req.params.id,{$set:classroomid})
//     if (studentarray) await Studentclassroom.findByIdAndUpdate(req.params.id,{$push: studentarray})
//     updated_student_classroom=await Studentclassroom.findById(req.params.id)
//     //res.send(updated_student_classroom)
//     res.send(studentarray)
// }
//
// exports.student_classroom_delete=async (req,res)=>{
//     deleted_student_classroom = await Studentclassroom.findByIdAndRemove(req.params.id)
//     res.send(deleted_student_classroom)
// }
