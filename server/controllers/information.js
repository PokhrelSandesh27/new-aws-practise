const express = require('express')

const { Information, validate  , validateSearch} = require('../models/information')

const { getArr } = require('../utils')
const { User } = require('../models/user')
const { Exam } = require('../models/exam')
exports.createInformation= async (req, res) => {
    const { error, value: informationReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const { notifier: userId } = informationReq

    const user = await User.findById(userId)
    if (!user) return res.status(400).send('User with given ID is not found')

    information = new Information(informationReq)
    await information.save()

    res.send(information)
}

exports.getAllInformations = async (req, res) => {
    const informations = await Information.find().populate("notifier")
    res.send(informations)
}

exports.getInformationById = async (req, res) => {
    const information= await Information.findById(req.params.id).populate("notifier")
    if (!information) return res.status(400).send('Information with given ID not found')

    res.send(information)
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

    const information = await Information.find(searchReq).populate("notifier")

    res.send(information)
}