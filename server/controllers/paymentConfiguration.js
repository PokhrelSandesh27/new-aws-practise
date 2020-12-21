const express = require('express')
const { RRule, RRuleSet, rrulestr } = require('rrule')
const moment = require('moment')

const { Student } = require('../models/student')
const { Payment } = require('../models/payment')
const { User } = require('../models/user')

const { PaymentCategory } = require('../models/paymentCategory')
const { PaymentConfiguration, validate, validateSearchPaymentConfiguration } = require('../models/paymentConfiguration')
const { getArr } = require('../utils')

exports.create = async (req, res) => {
    const { error, value: paymentConfig } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const paymentConfiguration= await PaymentConfiguration.findOne({name:paymentConfig.name})
    if (paymentConfiguration) return res.status(400).send('Payment Configuration with given name already exists')

    const paymentCategory = await PaymentCategory.findById(paymentConfig.paymentCategory)
    if (!paymentCategory) return res.status(400).send('Payment category with given ID is not found')

    let { startDate, endDate } = paymentConfig

    const options = {
        dtstart: moment(startDate).toDate(),
        until: moment(endDate).toDate(),
        freq: paymentConfig.repetition === 'MONTHLY' ? RRule.MONTHLY : RRule.YEARLY
    }

    const rule = new RRule(options).toString()

    const config = new PaymentConfiguration({
        ...paymentConfig,
        startDate,
        endDate,
        rule,
        classroom: paymentCategory.classroom,
        year: paymentCategory.year
    })
    await config.save()

    res.send(config)
}

exports.generate = async (req, res) => {
    const config = await PaymentConfiguration.findById(req.params.id).populate('paymentCategory classroom')
    if (!config) return res.status(400).send('Payment configuration with given ID is not found')
    if (config.isGenerated) return res.status(400).send('Payment configuration with given ID is already generated')

    const students = await Student.find({ classroom: config.classroom }).populate('student')


    const rules = RRule.fromString(config.rule).all()

    const payments = []

    students.forEach(student => {
        rules.forEach(async date => {
            const dateObj = moment(date)
            const payment = {
                user: student.student._id,
                username: student.student.username || "N/A",
                student: student._id,
                classroom: student.classroom,
                paymentConfiguration: config._id,
                paymentCategory: config.paymentCategory._id,
                year: dateObj.year(),
                month: dateObj.month(),
                dateTime: dateObj.valueOf(),
                isPaid: false,
                amount: config.paymentCategory.amount
            }

            payments.push(payment)
        })
    })

    const savedPayments = await Payment.insertMany(payments)
    await config.update({isGenerated: true})

    res.send(savedPayments)
}

exports.getAllPaymentConfigurations = async (req, res) => {
    const paymentConfigurations = await PaymentConfiguration.find().populate('paymentCategory classroom')
    res.send(paymentConfigurations)
}

exports.getPaymentConfigurationById = async (req, res) => {
    const paymentConfiguration = await PaymentConfiguration.findById(req.params.id).populate('paymentCategory classroom')
    if (!paymentConfiguration) return res.status(400).send('Payment Configuration with given ID not found')

    res.send(paymentConfiguration)
}

exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearchPaymentConfiguration(req.body)
    if (error) res.status(400).send(error.details[0].message)
    //const {username,status,groups} = searchReq
    const paymentConfigurations = await PaymentConfiguration.find(searchReq).populate('paymentCategory classroom')
    res.send(paymentConfigurations)
}
