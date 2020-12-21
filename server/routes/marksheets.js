const express = require('express')
const router = express.Router()

const controller = require('../controllers/marksheet')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

router.post('/create', auth , controller.createMarksheet)
router.get('/read', auth, controller.getAllMarksheets)
router.get('/read/:id', auth, controller.getMarksheetById)
router.post('/search', auth, controller.search)
// router.put('/:id/update', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)
module.exports = router