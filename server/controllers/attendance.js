const express = require('express')
const omit = require('lodash/omit')
const { Attendance, validate, validateSearch } = require('../models/attendance')
const { User } = require('../models/user')
const { Student } = require('../models/student')
const { getArr } = require('../utils')

exports.createAttendance = async (req, res) => {
    const { error, value: attendanceReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { user:userId } = attendanceReq
    const dateTime=Date.now();

    let user = await User.findById(userId)
    if (!user) return res.status(400).send('User with given ID not found')
    
    let entry ={...attendanceReq,dateTime:dateTime,isPresent:true}
    if (user.groups.includes('STUDENT')) {
        const studentObj = await Student.findOne({ student: user._id }).populate('classroom')
        let { classroom } = studentObj
        entry= {...attendanceReq,dateTime:dateTime,isPresent:true,classroom:classroom}
    }

    

    attendance = new Attendance(entry)
    await attendance.save()

    res.send(attendance)
}

exports.getAllAttendance = async (req, res) => {
    const attendences = await Attendance.find().populate('user')
    res.send(attendences)
}

exports.getAttendanceById = async (req, res) => {
    const attendance = await Attendance.findById(req.params.id).populate('user')
    if (!attendance) return res.status(400).send('Attendance with given ID not found')

    res.send(attendance)
}

exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    const { startDate, endDate } = searchReq

    const search = {
        ...omit(searchReq, ['startDate', 'endDate'])
    }

    if(startDate || endDate){
        search.dateTime={}
    }

    if (startDate) {
        search.dateTime['$gte'] = startDate
    }

    if (endDate) {
        search.dateTime['$lte'] = endDate
    }

    const attendance = await Attendance.find(search).populate('classroom')

    res.send(attendance)
}