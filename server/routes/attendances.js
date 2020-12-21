const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/attendance')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const librarian = require('../middleware/librarian')

router.post('/create', auth, controller.createAttendance)
router.get('/read', auth, controller.getAllAttendance)
router.get('/read/:id', auth, controller.getAttendanceById)
router.post('/search', auth, controller.search)

module.exports = router
