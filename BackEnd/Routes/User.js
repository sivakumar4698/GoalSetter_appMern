const express = require('express')
const router = express.Router()
const {
    addUser,
    loginUser,
    getUser


} = require('../Controllers/usercontroller')
const {protect} = require('../Middleware/authMiddleware')

router.post('/', addUser)
router.post('/login', loginUser)
router.get('/me',protect, getUser)


module.exports = router