require('dotenv').config()
const express = require('express')
const connectToMongoDB = require('./DB/connectToMongoDB')
const {userSignUp,userLogIn} = require('./controller/user')

const app = express() 
const PORT = process.env.PORT

// Connect Database
connectToMongoDB().then(()=>console.log("Database Connected Successfully!"))

// middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/signup',userSignUp)
app.post('/login',userLogIn)

app.listen(PORT,()=> console.log(`Server Started at http://localhost:${PORT}`))

