const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/assignment')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

const upload = getUpload('everestwalk-assignments')
router.post('/create', [auth, teacher], controller.createAssignment)
router.put('/:id/upload', [auth, teacher], upload.single('file'), controller.uploadAssignment)
router.get('/read', auth, controller.getAllAssignments)
router.get('/read/:id', auth, controller.getAssignmentById)
router.post('/search', auth, controller.search)
// router.put('/:id/updates', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
