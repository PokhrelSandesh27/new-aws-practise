const express = require('express')
const router = express.Router()

const controller = require('../controllers/message')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

router.post('/create', auth, controller.createMessage)
router.get('/read/:id', auth , controller.getMessageById)
router.get('/read', auth, controller.getAllMessages)
router.post('/search', auth, controller.searchMessages)

module.exports = router
