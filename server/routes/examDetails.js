const express = require('express')
const router = express.Router()

const controller = require('../controllers/examDetail')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

router.post('/create', auth, controller.createExamDetail)
router.get('/read', auth, controller.getAllExamDetails)
router.get('/read/:id', auth, controller.getExamDetailById)
// router.put('/:id/update', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)
router.post('/search', auth, controller.search)
router.put('/:id/addquestion', controller.addQuestionSet)
router.get('/:student/:examDetail/has_attended', controller.hasAttended)
module.exports = router
