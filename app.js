require('dotenv').config()
const express = require('express')
const connectToMongoDB = require('./DB/connectToMongoDB')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')
const cors = require('cors')

const app = express() 
const PORT = process.env.PORT

// Connect Database
connectToMongoDB().then(()=>console.log("Database Connected Successfully!"))

// middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/user',userRoute)
app.use('/api',taskRoute)

app.listen(PORT,()=> console.log(`Server Started at http://localhost:${PORT}`))

