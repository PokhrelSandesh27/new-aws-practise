const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const users = require('./routes/users')
const auth = require('./routes/auth')
const books = require('./routes/books')
const bookIssues = require('./routes/bookIssues')
const classrooms = require('./routes/classrooms')
//const meetings = require('./routes/meetings')
const students = require('./routes/students')
const timetables = require('./routes/timetables')
const slots = require('./routes/slots')
const assignments = require('./routes/assignments')
const presentations = require('./routes/presentations')
const assignmentSubmissions = require('./routes/assignmentSubmissions')
const exams = require('./routes/exams')
const examDetails = require('./routes/examDetails')
const marksheets = require('./routes/marksheets')
const examReports = require('./routes/examReports')
const subjects = require('./routes/subjects')
const paymentCategories = require('./routes/paymentCategories')
const paymentConfigurations = require('./routes/paymentConfigurations')
const scholarshipConfigurations = require('./routes/scholarshipConfigurations')
const payments = require('./routes/payments')
const messages = require('./routes/messages')
const attendances = require('./routes/attendances')
const informations = require('./routes/informations')
const events = require('./routes/events')
const questionSets = require('./routes/questionSets')
const alumni = require('./routes/alumni')

const databases = require('./db')
const { BookIssue } = require('./models/bookIssue')

/*
if (!process.env.JWT_SECRET) {
    console.log('FATAL ERROR: JWT_SECRET is not defined')
    process.exist(1) // 0 means success anything else failure
}
databases.connectToDatabase
*/

/*mongoose.connect('mongodb://localhost/ams') //:TODO add db username password
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))
*/
app.use(cors())

// // add other middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.use(express.json())
app.use('/api/users', users) //:TODO add version
app.use('/api/auth', auth)
app.use('/api/books', books)
app.use('/api/book-issues', bookIssues)
app.use('/api/classrooms', classrooms)
//app.use('/api/meetings', meetings)
app.use('/api/students', students)
app.use('/api/timetables', timetables)
app.use('/api/slots', slots)
app.use('/api/assignments', assignments)
app.use('/api/presentations', presentations)
app.use('/api/assignmentsubmissions', assignmentSubmissions)
app.use('/api/exams', exams)
app.use('/api/examdetails', examDetails)
app.use('/api/marksheets', marksheets)
app.use('/api/examreports', examReports)
app.use('/api/subjects', subjects)
app.use('/api/payment-categories', paymentCategories)
app.use('/api/payment-configurations', paymentConfigurations)

app.use('/api/scholarship-configurations', scholarshipConfigurations)
app.use('/api/payments', payments)
app.use('/api/messages', messages)
app.use('/api/attendances', attendances)
app.use('/api/informations', informations)
app.use('/api/events', events)
app.use('/api/questionsets', questionSets)
app.use('/api/alumni', alumni)
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}...`))
