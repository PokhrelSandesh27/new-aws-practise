const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/questionSet')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

router.post('/create', [auth, teacher], controller.createQuestionSet)
router.get('/read', auth, controller.getAllQuestionSets)
router.get('/read/:id', auth, controller.getQuestionSetById)
router.post('/search', auth, controller.search)
// router.put('/:id/updates', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
