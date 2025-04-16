const {Router} = require('express')
const userAuth = require('../middlewares/user-middleware')
const adminAuth = require('../middlewares/admin-middleware')
const {taskCreatedByUser,taskUpdatedByUserId,taskDeletedByUserId,getTasksByUserId, getAllUsersTasks } = require('../controller/task')

const route = Router()

route.post('/create-task',userAuth,taskCreatedByUser)
route.get('/get-task',userAuth,getTasksByUserId)
route.put('/update-task',userAuth,taskUpdatedByUserId)
route.delete('/delete-task',userAuth,taskDeletedByUserId)
route.get('/admin/tasks',adminAuth, getAllUsersTasks)

module.exports = route