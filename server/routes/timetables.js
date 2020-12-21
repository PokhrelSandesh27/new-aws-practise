const express = require('express')
const router = express.Router()

const controller = require('../controllers/timetable')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

router.post('/create', [auth, management], controller.createTimetable)
router.get('/read', auth, controller.getAllTimetables)
router.get('/read/:id', auth, controller.getTimetableById)
// router.put('/:id/update', controller.lecture_update)
// router.delete('/:id/delete', controller.lecture_delete)
router.post('/search', auth, controller.searchTimetables)
module.exports = router
