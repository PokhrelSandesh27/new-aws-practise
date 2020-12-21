const express = require('express')
const moment = require('moment')
const rrule = require('rrule')
const omit = require('lodash/omit')

const { Payment, validate, validateSearchPayment, validateGeneratePayments, validateApproveScholarships } = require('../models/payment')
const { getArr } = require('../utils')
const { User } = require('../models/user')
const { Student } = require('../models/student')
const { Classroom } = require('../models/classroom')
const { PaymentCategory } = require('../models/paymentCategory')
const { ScholarshipConfiguration } = require('../models/scholarshipConfiguration')
const { PaymentConfiguration } = require('../models/paymentConfiguration')

exports.createPayment = async (req, res) => {
    const { error, value: paymentReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    payment = new Payment(paymentReq)
    await payment.save()

    res.send(payment)
}

exports.getAllPayments = async (req, res) => {
    const payments = await Payment.find().populate('user classroom student paymentCategory')
    res.send(payments)
}

exports.getPaymentById = async (req, res) => {
    const payment = await Payment.findById(req.params.id).populate('user classroom student paymentCategory')
    if (!payment) return res.status(400).send('Payment with given ID not found')

    res.send(payment)
}

exports.searchPayments = async (req, res) => {
    const { value: searchReq } = validateSearchPayment(req.body)
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

    const payments = await Payment.find(search).populate('user classroom student paymentCategory paymentConfiguration scholarshipConfiguration')

    res.send(payments)
}

exports.searchPaymentsbyStudent = async (req, res) => {

    const { value: searchReq } = validateSearchPayment(req.body)
    const { startDate, endDate } = searchReq

        const search = {
            ...omit(searchReq, ['startDate', 'endDate']),
            dateTime: {}
        }

        if (startDate) {
            search.dateTime['$gte'] = startDate
        }

        if (endDate) {
            search.dateTime['$lte'] = endDate
        }

        const payments = await Payment.find(search)

    res.send(payments)
}

exports.makePayment = async (req, res) => {
    let payment = await Payment.findById(req.params.id)
    if (!payment) return res.status(400).send('Payment with given ID not found.')

    if (payment.isPaid === true) return res.status(400).send('Payment with given ID is paid already.')

    await Payment.findByIdAndUpdate(req.params.id, { isPaid: true })

    payment = await Payment.findById(req.params.id)
    res.send(payment)
}

exports.bulkPayment = async (req, res) => {
    const { value: searchReq } = validateSearchPayment(req.body)
    
    const { startDate, endDate } = searchReq

    const search = {
        ...omit(searchReq, ['startDate', 'endDate']),
        dateTime: {}
    }

    if (startDate) {
        search.dateTime['$gte'] = startDate
    }

    if (endDate) {
        search.dateTime['$lte'] = endDate
    }
    
    payment= await Payment.bulkWrite([
        {
          updateMany: {
            filter: search, 
            update: { isPaid: true }
          }
        }
      ]).then(res => {
        console.log(res.modifiedCount);
       });
    res.send(payment)
}
