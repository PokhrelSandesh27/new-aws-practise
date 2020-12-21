const express = require('express')
const router = express.Router()

const controller = require('../controllers/student')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

router.post('/create', [auth, management], controller.createStudent)
router.post('/search', auth, controller.search)
router.get('/read/:id', auth, controller.getStudentById)
// router.put('/:id/update', student_classroom_controller.student_classroom_update)
// router.delete('/:id/delete', student_classroom_controller.student_classroom_delete)

module.exports = router