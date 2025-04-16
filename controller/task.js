const { Task } = require('../model/tasks')

const taskCreatedByUser = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newlyCreatedTask = new Task({
            title,
            description,
            createdBy:req.user._id
        })
        await newlyCreatedTask.save()

        res.status(201).json({
            success: true,
            message: "Successfully created new task!",
            task: newlyCreatedTask
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const taskUpdatedByUserId = async (req, res) => {
    try {
        const {taskId, newTitle , newDescription} = req.body 
        
        await Task.findByIdAndUpdate(taskId,{
            title : newTitle,
            description : newDescription
        })
        res.status(200).json({
            success:true,
            message:'Task updated successfully!'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const taskDeletedByUserId = async (req, res) => {
    try {
        const {taskId} = req.body 

        await Task.findByIdAndDelete(taskId)
        res.status(200).json({
            success:true,
            message:'Task deleted successfully!'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getTasksByUserId = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id }).populate("createdBy")
        res.status(200).json({
            success: true,
            message: "Successfully fetched all tasks!",
            tasks
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getAllUsersTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate("createdBy")
        res.status(200).json({
            success: true,
            message: "Successfully fetch all users tasks!",
            tasks
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    taskCreatedByUser,
    taskUpdatedByUserId,
    taskDeletedByUserId,
    getTasksByUserId,
    getAllUsersTasks
}