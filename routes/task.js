const {Router} = require('express')
const userAuth = require('../middlewares/user-middleware')
const adminAuth = require('../middlewares/admin-middleware')
const { getAllUsersTasks, getUserTasks } = require('../controller/task')

const route = Router()

route.get('/user/tasks',userAuth,getUserTasks)
route.get('/admin/tasks',userAuth,adminAuth, getAllUsersTasks)

module.exports = route