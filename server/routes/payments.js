const express = require('express')
const router = express.Router()

const controller = require('../controllers/payment')
const auth = require('../middleware/auth')
const accountant = require('../middleware/accountant')

// router.post('/create', [auth,  accountant], controller.createPayment)
router.get('/read', auth, controller.getAllPayments)
router.get('/read/:id', auth, controller.getPaymentById)
router.post('/search', auth, controller.searchPayments)
router.put('/:id/pay', [auth, accountant], controller.makePayment)
router.put('/bulk-pay', [auth, accountant], controller.bulkPayment)
// router.put('/generate', [auth,  accountant] , controller.generatePayment)
// router.put('/:id/update', classroom_controller.classroom_update)
// router.delete('/:id/delete', classroom_controller.classroom_delete)

module.exports = router
