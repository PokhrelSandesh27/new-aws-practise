const express = require('express')
const router = express.Router()
const { getUpload } = require('../utils')

const controller = require('../controllers/bookIssue')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const librarian = require('../middleware/librarian')

router.post('/create', [auth, librarian], controller.createBookIssue)
router.get('/read', auth, controller.getAllBookIssues)
router.get('/read/:id', auth, controller.getBookIssueById)
router.post('/search', auth, controller.search)
router.post('/issue', auth, controller.issueBook)
router.put('/:id/return', auth, controller.returnBook)
router.put('/:id/pay-overdue-fine', auth, controller.payOverdueFine)


// router.put('/:id/updates', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
