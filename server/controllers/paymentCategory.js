const express = require('express')

const teacher = require('../middleware/teacher')

const { PaymentCategory, validate, validateSearchPaymentCategory } = require('../models/paymentCategory')
const { getArr } = require('../utils')

exports.createPaymentCategory = async (req, res) => {
    const { error, value: paymentCategoryReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let { name, year, classroom } = paymentCategoryReq

    let paymentCategory = await PaymentCategory.findOne({ name, year, classroom })
    if (paymentCategory) return res.status(400).send(`${name} for ${year} already exists`)

    paymentCategory = new PaymentCategory(paymentCategoryReq)
    await paymentCategory.save()

    res.send(paymentCategory)
}

exports.getAllPaymentCategories = async (req, res) => {
    const paymentCategories = await PaymentCategory.find().populate('classroom')
    res.send(paymentCategories)
}

exports.getPaymentCategoryById = async (req, res) => {
    const paymentCategory = await PaymentCategory.findById(req.params.id).populate('classroom')
    if (!paymentCategory) return res.status(400).send('Payment Category with given ID not found')

    res.send(paymentCategory)
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
exports.searchPaymentCategories = async (req, res) => {
    const { error, value: searchReq } = validateSearchPaymentCategory(req.body)
    if (error) res.status(400).send(error.details[0].message)
    //const {username,status,groups} = searchReq
    const paymentCategories = await PaymentCategory.find(searchReq).populate('classroom')
    res.send(paymentCategories)
}
