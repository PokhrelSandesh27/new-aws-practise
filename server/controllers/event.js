const express = require('express')

const { Event, validate  , validateSearch} = require('../models/event')

const { getArr } = require('../utils')
const { Information } = require('../models/information')

exports.createEvent= async (req, res) => {
    const { error, value: eventReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { information: informationId } = eventReq

    if(informationId){
        const information = await Information.findById(informationId)
        if (!information) return res.status(400).send('Information with given ID is not found')
    }
    

    events = new Event(eventReq)
    await events.save()

    res.send(events)
}

exports.getAllEvents = async (req, res) => {
    const events = await Event.find().populate("information")
    res.send(events)
}

exports.getEventById = async (req, res) => {
    const events= await Event.findById(req.params.id).populate("information")
    if (!events) return res.status(400).send('Event with given ID not found')

    res.send(events)
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

    const events = await Event.find(searchReq).populate("information")

    res.send(events)
}