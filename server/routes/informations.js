const express = require('express')
const router = express.Router()

const controller = require('../controllers/information')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

router.post('/create', [auth, management], controller.createInformation)
router.get('/read', auth, controller.getAllInformations)
router.get('/read/:id', auth, controller.getInformationById)
// router.put('/:id/update', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)
router.post('/search', auth, controller.search)
module.exports = router