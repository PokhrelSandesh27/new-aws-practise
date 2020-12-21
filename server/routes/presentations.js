const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/presentation')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

const upload = getUpload('everestwalk-presentations')
router.post('/create', [auth, teacher], controller.createPresentation)
router.put('/:id/upload', [auth, teacher], upload.single('file'), controller.uploadPresentation)
router.get('/read', auth, controller.getAllPresentations)
router.get('/read/:id', auth, controller.getPresentationById)
router.post('/search', auth, controller.search)
// router.put('/:id/updates', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
