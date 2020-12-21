const express = require('express')
const bcrypt = require('bcrypt')
const omit = require('lodash/omit')

const userController = require('../controllers/user')
const auth = require('../middleware/auth')
const teacher = require('../middleware/teacher')
const management = require('../middleware/management')

const router = express.Router()
const { getUpload } = require('../utils')

const upload = getUpload('everestwalk-photos')
router.post('/create', [auth], userController.createUser)
router.post('/search', [auth], userController.searchUsers) //:TODO has to introduce roles
router.get('/read/:id', auth, userController.getUserById)
router.put('/:id/upload', auth, upload.single('file'), userController.uploadPhoto)
// router.put('/:id/update', userController.user_update)
// router.delete('/:id/delete', userController.user_delete)

module.exports = router