const express = require('express')

const { Slot, validate } = require('../models/slot')
const { getArr } = require('../utils')

exports.createSlot = async (req, res) => {
    const { error, value: slotReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name } = slotReq

    let slot = await Slot.findOne({ name })

    if (slot)
        return res.status(400).send(` Slot with name: ${name} already exists`)

    slot = new Slot(slotReq)
    await slot.save()

    res.send(slot)
}

exports.getAllSlots = async (req, res) => {
    const slots = await Slot.find()
    res.send(slots)
}

exports.getSlotById = async (req, res) => {
    const slot = await Slot.findById(req.params.id)
    if (!slot) return res.status(400).send('Slot with given ID not found')

    res.send(slot)
}

// exports.classroom_update = async (req, res) => {
//     const classroomReq = req.body
//     //if (error) res.status(400).send(error.details[0].message)
//
//     await Classroom.findByIdAndUpdate(req.params.id, { ...classroomReq })
//     updated_classroom = await Classroom.findById(req.params.id)
//     res.send(updated_classroom)
// }
//
// exports.classroom_delete = async (req, res) => {
//     deleted_classroom = await Classroom.findByIdAndRemove(req.params.id)
//     res.send(deleted_classroom)
// }

exports.searchSlots = async (req, res) => {
    const { error, value: searchReq } = validateSearchSlot(req.body)
    if (error) res.status(400).send(error.details[0].message)
    //const {username,status,groups} = searchReq
    const slots=await Slot.find(searchReq)
    res.send(slots)
}