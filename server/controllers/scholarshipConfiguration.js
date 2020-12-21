const express = require('express')
const moment = require('moment')
const { RRule, RRuleSet, rrulestr } = require('rrule')

const { Student } = require('../models/student')
const { User } = require('../models/user')
const { Payment } = require('../models/payment')

const teacher = require('../middleware/teacher')
const { PaymentCategory } = require('../models/paymentCategory')

const { ScholarshipConfiguration, validate, validateSearchScholarshipConfiguration } = require('../models/scholarshipConfiguration')
const { getArr } = require('../utils')

exports.create= async (req, res) => {
    const { error, value: scholarshipConfig} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const scholarshipConfiguration= await ScholarshipConfiguration.findOne({name:scholarshipConfig.name})
    if (scholarshipConfiguration) return res.status(400).send('Scholarship Configuration with given name already exists')

    const paymentCategory = await PaymentCategory.findById(scholarshipConfig.paymentCategory)
    if (!paymentCategory) return res.status(400).send('Payment category with given ID is not found')

    const student= await Student.findById(scholarshipConfig.student)
    if (!student) return res.status(400).send('Student with given ID is not found')

    let { startDate, endDate } = scholarshipConfig
    const options = {
        dtstart: moment(startDate).toDate(),
        until: moment(endDate).toDate(),
        freq: scholarshipConfig.repetition === 'MONTHLY' ? RRule.MONTHLY : RRule.YEARLY
    }


    const rule = new RRule(options).toString()

    const config = new ScholarshipConfiguration({
        ...scholarshipConfig,
        user: student.student,
        classroom: student.classroom,
        startDate,
        endDate,
        rule,
        year: paymentCategory.year
        
    })
    await config.save()

    res.send(config)
}

exports.generate = async (req, res) => {
    const config = await ScholarshipConfiguration.findById(req.params.id).populate('paymentCategory student user classroom')
    if (!config) return res.status(400).send('Scholarship configuration with given ID is not found')
    if (config.isGenerated) return res.status(400).send('Scholarship configuration with given ID is already generated')
    
    const student = await Student.findById(config.student)
    const user = await User.findById(student.student)
    console.log(user)
    const rules = RRule.fromString(config.rule).all()

    const payments = []

    rules.forEach(date => {
        const dateObj = moment(date)

        const payment = {
            user: student.student,
            username: user.username,
            student: student._id,
            classroom: student.classroom,
            scholarshipConfiguration: config._id,
            paymentCategory: config.paymentCategory._id,
            year: dateObj.year(),
            month: dateObj.month(),
            dateTime: dateObj.valueOf(),
            isPaid: false,
            amount: config.paymentCategory.amount*(config.discount/100)*(-1)
        }

        payments.push(payment)
    })

    const savedPayments = await Payment.insertMany(payments)
    await config.update({isGenerated: true})

    res.send(savedPayments)
}

exports.getAllScholarshipConfigurations = async (req, res) => {
    const scholarshipConfigurations = await ScholarshipConfiguration.find().populate('paymentCategory student user classroom')
    res.send(scholarshipConfigurations)
}

exports.getScholarshipConfigurationById = async (req, res) => {
    const scholarshipConfiguration = await ScholarshipConfiguration.findById(req.params.id).populate('paymentCategory student user classroom')
    if (!scholarshipConfiguration) return res.status(400).send('Scholarship Configuration with given ID not found')

    res.send(scholarshipConfiguration)
}

exports.searchScholarshipConfigurations= async (req, res) => {
    const { error, value: searchReq } = validateSearchScholarshipConfiguration(req.body)
    if (error) res.status(400).send(error.details[0].message)
    //const {username,status,groups} = searchReq
    const scholarshipConfigurations=await ScholarshipConfiguration.find(searchReq).populate('paymentCategory student user classroom')
    res.send(scholarshipConfigurations)
}