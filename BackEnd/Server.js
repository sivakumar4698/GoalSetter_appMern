const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 8000
const {errorHandler} = require('./Middleware/errorMiddleware')
const connectDatabase = require('./DataBase')

const app = express()

connectDatabase()
//middleware code to access the req.body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const cors = require('cors');
app.use(cors());



app.use('/api/goals', require('./Routes/Goals'))
app.use('/api/users', require('./Routes/User'))

app.use(errorHandler)

app.listen(port, console.log(`Server Started on Port ${port}`))