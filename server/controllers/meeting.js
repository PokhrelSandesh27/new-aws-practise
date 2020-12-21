const express = require('express')
const uuid = require('uuid')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const teacher = require('../middleware/teacher')

const { Meeting, validate, validateSearchMeeting } = require('../models/meeting');
const { endsWith } = require('lodash');
const { Student } = require('../models/student');
const { User } = require('../models/user');
const { Classroom } = require('../models/classroom');
const { Lecture } = require('../models/lecture');

// std js with tab index of 4

// add async
exports.createMeeting = async (req,res)=>{
    const { error, value: meetingReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { teacher: teacherId, classroom : classroomId, lecture: lectureId } = meetingReq

    const teacher = await User.findById(teacherId)
    if (!teacher) return res.status(400).send('Invalid teacher ID')
    const classroom = await Classroom.findById(classroomId)
    if (!classroom) return res.status(400).send('Invalid Classroom ID')
    const lecture = await Lecture.findById(lectureId)
    if (!lecture) return res.status(400).send('Invalid Lecture ID')

    link = meetingReq.classroom+uuid.v4();
    meeting= new Meeting({...meetingReq,link:link});
    await meeting.save()
    res.send(meeting)
};

exports.getAllMeetings=async (req,res)=>{
    const meetings=await Meeting.find().populate('classroom lecture teacher')
    res.send(meetings);
};



exports.getMeetingById=async (req,res)=>{
    const meeting=await Meeting.findById(req.params.id).populate(['classroom','lecture','teacher'])
    if(!meeting) return res.status(400).send("Meeting not found")
    res.send(meeting)
};
/*
exports.meeting_update=async (req,res)=>{
    const meetingReq=req.body
    //if (error) res.status(400).send(error.details[0].message)

    await Meeting.findByIdAndUpdate(req.params.id,{...meetingReq})
    updated_meeting=await Meeting.findById(req.params.id)
    res.send(updated_meeting)
}

exports.meeting_delete=async (req,res)=>{
    deleted_meeting = await Meeting.findByIdAndRemove(req.params.id)
    res.send(deleted_meeting)
}
*/
exports.searchMeetings = async (req, res) => {
    const { error, value: searchReq } = validateSearchMeeting(req.body)
    if (error) res.status(400).send(error.details[0].message)
    //const {username,status,groups} = searchReq
    const meetings=await Meeting.find(searchReq).populate('classroom lecture teacher')
    res.send(meetings)
}
exports.searchMeetingsByStudent=async (req,res)=>{
    const meetingReq=req.body
    const { user : userId } = meetingReq
    const user = await User.findById(userId)
    if (!user) return res.status(400).send('Invalid User ID')
    let student=await Student.find({
        "user":userId
    },{
        "classroom":1
    });
    const classroom  = student[0]["classroom"]
    meetings= await Meeting.find({
        "classroom":classroom
    }).populate('classroom lecture teacher')
    res.send(meetings);
}

exports.searchMeetingsByTeacher=async (req,res)=>{
    const meetingReq=req.body
    const { userid } = meetingReq
    
    meetings= await Meeting.find({
        "teacher":userid
    }).populate('classroom lecture teacher')
    res.send(meetings);
}