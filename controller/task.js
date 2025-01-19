const {Task} = require('../model/tasks')

const getUserTasks = async(req,res)=>{
    try {
        const tasks = await Task.findOne({createdBy: req.user._id}).populate("createdBy")
        res.status(200).json({
            success:true,
            message:"Successfully fetched all tasks!",
            tasks 
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Not fetched all tasks because something went wrong"
        })
    }

}

const getAllUsersTasks = async(req,res)=>{
    try {
        const tasks = await Task.find({})
        res.status(200).json({
            success:true,
            message:"Successfully fetch all users tasks!",
            tasks 
        })
    } catch(err) {
        return res.status(500).json({
            success:false,
            message:"Not fetched all tasks because something went wrong"
        })
    }
}


module.exports = {
    getUserTasks,
    getAllUsersTasks
}