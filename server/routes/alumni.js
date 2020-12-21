const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/alumni')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const librarian = require('../middleware/librarian')

const upload = getUpload('everestwalk-alumni-photos')
router.post('/create', auth, controller.createAlumni)
router.put('/:id/upload', auth, upload.single('file'), controller.uploadPhoto)
router.get('/read', auth, controller.getAllAlumni)
router.get('/read/:id', auth, controller.getAlumniById)
router.post('/search', auth, controller.search)

module.exports = router