const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/assignmentSubmission')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

const upload = getUpload('everestwalk-assignments')
router.post('/create', auth, controller.createAssignmentSubmission)
router.put('/:id/upload', auth, upload.single('file'), controller.uploadAssignmentSubmission)
router.get('/read', auth, controller.getAllAssignmentSubmissions)
router.get('/read/:id', auth, controller.getAssignmentSubmissionById)
router.post('/search', auth, controller.search)
// router.put('/:id/updates', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
