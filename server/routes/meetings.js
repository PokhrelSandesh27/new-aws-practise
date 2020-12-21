const express = require('express')
const router = express.Router()

const controller = require('../controllers/meeting')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

router.post('/create', [auth, teacher], controller.createMeeting)
router.get('/read/:id', auth , controller.getMeetingById)
//router.put('/:id/update', controller.meeting_update)
//router.delete('/:id/delete', controller.meeting_delete)
router.get('/read', auth, controller.getAllMeetings)
router.post('/search', auth , controller.searchMeetings)
router.post('/student/search', auth, controller.searchMeetingsByStudent)
router.post('/teacher/search', [auth, teacher], controller.searchMeetingsByTeacher)
module.exports = router