const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/book')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const librarian = require('../middleware/librarian')

const upload = getUpload('everestwalk-books')
const uploadCover = getUpload('everestwalk-bookcovers')
router.post('/create', [auth, librarian], controller.createBook)
router.put('/:id/upload', [auth, librarian], upload.single('file'), controller.uploadBook)
router.put('/:id/uploadcover', [auth, librarian], uploadCover.single('file'), controller.uploadBookCover)
router.get('/read', auth, controller.getAllBooks)
router.get('/read/:id', auth, controller.getBookById)
router.post('/search', auth, controller.search)
// router.put('/:id/updates', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
