const express = require('express')
const router = express.Router()

const controller = require('../controllers/paymentConfiguration')

const auth = require('../middleware/auth')
const management = require('../middleware/management')
const accountant = require('../middleware/accountant')

router.post('/create', [auth, management], controller.create)
router.get('/read', auth, controller.getAllPaymentConfigurations)
router.get('/read/:id', auth, controller.getPaymentConfigurationById)
router.post('/search', auth, controller.search)
router.post('/generate/:id', [auth, management], controller.generate)

module.exports = router
