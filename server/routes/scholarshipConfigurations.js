const express = require('express')
const router = express.Router()

const controller = require('../controllers/scholarshipConfiguration')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')
const  accountant = require('../middleware/accountant')

router.post('/create', [auth,management], controller.create)
router.get('/read', auth, controller.getAllScholarshipConfigurations)
router.get('/read/:id', auth, controller.getScholarshipConfigurationById)
router.post('/search', auth , controller.searchScholarshipConfigurations)
router.post('/generate/:id', [auth, management], controller.generate)

module.exports = router