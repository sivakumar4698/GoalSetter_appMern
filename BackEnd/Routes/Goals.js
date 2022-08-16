const express = require('express')
const router = express.Router()
const {
    getGoals,
    createGoals,
    updateGoals,
    deleteGoals
} = require('../Controllers/goalcontroller')
const {protect} = require('../Middleware/authMiddleware')

//Alternative way to define the requests with same route
//router.route('/').get(getGoals).post(createGoals)

router.get('/',protect, getGoals)

router.post('/',protect, createGoals)

router.put('/:id',protect, updateGoals)

router.delete('/:id',protect, deleteGoals)

module.exports = router