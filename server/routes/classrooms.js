const express = require('express')
const router = express.Router()

const controller = require('../controllers/classroom')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

router.post('/create', [auth, management], controller.createClassroom)
router.get('/read', auth, controller.getAllClassrooms)
router.get('/read/:id', auth, controller.getClassroomById)
// router.put('/:id/update', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)
module.exports = router