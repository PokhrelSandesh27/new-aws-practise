const express = require('express')
const router = express.Router()

const controller = require('../controllers/paymentCategory')

const auth = require('../middleware/auth')
const management = require('../middleware/management')

router.post('/create', [auth, management], controller.createPaymentCategory)
router.get('/read', auth, controller.getAllPaymentCategories)
router.get('/read/:id', auth, controller.getPaymentCategoryById)
router.post('/search', auth, controller.searchPaymentCategories)

module.exports = router
