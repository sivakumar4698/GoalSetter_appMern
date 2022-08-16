
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const hash = require('bcryptjs')


//@Access Public
//@Route api/users
//@desc Login User

//generate JWT token

const tokengeneration = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}
const loginUser = asyncHandler(async (req, res) => {
    const{email, password} = req.body

    const user = await User.findOne({ email })

    
    if(user && (await hash.compare(password, user.password))){
        res.json({
            _id: user.id ,
            name: user.name,
        email: user.email,
        token: tokengeneration(user.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
      }
})


//@Access Public
//@Route api/users
//@desc Register Users


const addUser = asyncHandler(async (req, res) => {
      const{name, email, password} = req.body

      if(!email || !name || !password){
        res.status(400)
        throw new Error('Please fill out all the required field')
      }

      

    //check user exists
    const checkUser = await User.findOne({ email })

    if(checkUser){
        res.status(400)
        throw new Error('There is already a user with this email')
    }

    //hash the password
    //generating Salt to hash the password

    const salt = await hash.genSalt(10)
    const encryptedpassword = await hash.hash(password, salt)

    //create user

    const user = await User.create({
        name,
        email,
        password:encryptedpassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
        email: user.email,
        token: tokengeneration(user.id)
        })
    }

    else{
        res.status(400)
        throw new Error('Invalid user Data')
    }
})


//@Access Private
//@Route api/users/me
//@desc Get User details


const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports= {
    addUser,
    loginUser,
    getUser


}