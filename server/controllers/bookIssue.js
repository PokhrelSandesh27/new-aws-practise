const moment = require('moment')
const omit = require('lodash/omit')

const { BookIssue, validate, validateSearch} = require('../models/bookIssue')
const { Book } = require('../models/book')
const { User } = require('../models/user')
exports.createBookIssue = async (req, res) => {
    const { error, value: bookIssueReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    bookIssue = new BookIssue(bookIssueReq)
    await bookIssue.save()

    res.send(bookIssue)
}

exports.getAllBookIssues = async (req, res) => {
    const bookIssues = await BookIssue.find().populate('user book')
    res.send(bookIssues)
}

exports.getBookIssueById = async (req, res) => {
    const bookIssue = await BookIssue.findById(req.params.id).populate('user book')
    if (!bookIssue) return res.status(400).send('Book Issue with given ID not found')

    res.send(bookIssue)
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

    bookIssues = await BookIssue.find(search).populate('user book')
    res.send(bookIssues)
}


exports.issueBook = async (req, res) => {
    //body: user, book
    //TODO: Validate if the book is in stock.
    const { error, value: bookIssueReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const {book:bookID,user:userID}=bookIssueReq;
    const book = await Book.findById(bookID)
    if (!book) return res.status(400).send('Book with given ID not found')
    const user = await User.findById(userID)
    if (!user) return res.status(400).send('User with given ID not found')

    const issueDate=Date.now();
    const DUE_DAYS=7;
    const dueDate=issueDate+(86400000*DUE_DAYS)
    const status="ISSUED";

    const {name,author}=book
    const text=name+" "+author
    bookIssue = new BookIssue({...bookIssueReq,issueDate,dueDate,status,text})
    await bookIssue.save()
     //TODO: Reduce the book in stock by 1.

    res.send(bookIssue)
}

exports.returnBook = async (req, res) => {
    let bookIssue = await BookIssue.findById(req.params.id)
    if (!bookIssue) return res.status(400).send('Book Issue with given ID not found.')
    if (bookIssue.status === "RETURNED") return res.status(400).send('Book issued with given ID is returned already.')

    const returnDate=Date.now();
     //TODO: Check if the fine is paid:
    const {dueDate,isFinePaid} =bookIssue;
    if (returnDate>(dueDate+86400000))
    {
        if(!isFinePaid) return res.status(400).send('Book issued has exceeded the due date. Overdue Fine has not been made')
    } 
    const status="RETURNED";
    await BookIssue.findByIdAndUpdate(req.params.id, {returnDate,status})
    bookIssue = await BookIssue.findById(req.params.id)
    //TODO: Add the book in stock by 1.
    res.send(bookIssue)
}

exports.payOverdueFine = async (req, res) => {
    let bookIssue = await BookIssue.findById(req.params.id)
    if (!bookIssue) return res.status(400).send('Book Issue with given ID not found.')
    if (bookIssue.status === "RETURNED") return res.status(400).send('Book issued with given ID is returned already.')

    const returnDate=Date.now();
    const {dueDate,isFinePaid:finePaidStatus} =bookIssue;
    if (finePaidStatus) return res.status(400).send(' Overdue Fine has been paid already')
    if (returnDate<dueDate) return res.status(400).send('Book issued has not exceeded the due date. Overdue Fine should not been made. ')
    const testDate=1602920206000
    const fineAmount = Math.floor(((returnDate-dueDate)/86400000)*5)
    const isFinePaid=true
    const finePaymentDate=Date.now();
    await BookIssue.findByIdAndUpdate(req.params.id, {isFinePaid,fineAmount,finePaymentDate})
    bookIssue = await BookIssue.findById(req.params.id)
    //TODO: Add the book in stock by 1.
    res.send(bookIssue)
}