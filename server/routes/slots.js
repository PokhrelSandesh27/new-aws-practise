const express = require('express')
const router = express.Router()

const controller = require('../controllers/slot')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')

router.post('/create', auth, controller.createSlot)
router.get('/read', auth, controller.getAllSlots)
router.get('/read/:id', auth, controller.getSlotById)
// router.put('/:id/update', controller.lecture_update)
// router.delete('/:id/delete', controller.lecture_delete)

module.exports = router
