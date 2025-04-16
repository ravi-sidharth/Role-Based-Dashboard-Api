const {Router} = require('express')
const validation = require('../middlewares/validation-middleware')
const {userAuth,adminAuth} = require('../middlewares/auth-middleware')
const {taskCreatedByUser,taskUpdatedByUserId,taskDeletedByUserId,getTasksByUserId, getAllUsersTasks } = require('../controller/task')

const route = Router()

route.post('/create-task',validation,userAuth,taskCreatedByUser)
route.get('/get-task',validation,userAuth,getTasksByUserId)
route.put('/update-task',validation,userAuth,taskUpdatedByUserId)
route.delete('/delete-task',validation,userAuth,taskDeletedByUserId)
route.get('/admin/tasks',validation,adminAuth, getAllUsersTasks)

module.exports = route