const {Schema , model} = require('mongoose')

const UserTask = new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy: {
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

const Task = model('task',UserTask)

module.exports ={
    Task
}