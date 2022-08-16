
const asyncHandler = require('express-async-handler')
const Goal = require('../Models/goalModel')
const user = require('../Models/userModel')
//@Access Private
//@Route api/goals
//@desc get all the user goals

const getGoals = asyncHandler(async (req, res) => {

    //get user goals with the help of req.user.id
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@Access Private
//@Route api/goals
//@desc Create goals

const createGoals = asyncHandler(async (req, res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Give us some text to work on')
    }
    
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

//@Access Private
//@Route api/goals/:id
//@desc Update the user goals

const updateGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //check the user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //user should match the goals

    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal =  await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.json(updatedGoal)
})


//@Access Private
//@Route api/goals/:id
//@desc Delete the user goals

const deleteGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //check the user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //user should match the goals

    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({message : 'Goal deleted successfully'})
})





module.exports= {
    getGoals,
    createGoals,
    updateGoals,
    deleteGoals
}
