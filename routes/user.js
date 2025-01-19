const {Router} = require('express')
const {userSignUp,userLogIn} = require('../controller/user')

const route = Router()

route.post('/signup',userSignUp)
route.post('/login',userLogIn)

module.exports = route