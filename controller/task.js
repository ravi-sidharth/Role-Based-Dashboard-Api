const {Task} = require('../model/tasks')


const getUserTasks = async(req,res)=>{
    try {
        const tasksWithDescriptions = [
            {
                title: "Complete the weekly report",
                description: "Summarize the team's performance for the week, highlighting key achievements, challenges, and next steps.",
                createdBy:req.user._id
        
            },
            {
                title: "Prepare a presentation for Monday's meeting",
                description: "Create a PowerPoint presentation summarizing project progress, objectives, and upcoming milestones.",
                createdBy:req.user._id
            },
            {
                title: "Organize your workspace",
                description: "Declutter your desk and arrange your tools and documents to improve productivity.",
                createdBy:req.user._id
            },
            {
                title: "Send follow-up emails to all clients",
                description: "Reach out to clients via email to check on project status, address concerns, and strengthen the relationship.",
                createdBy:req.user._id
            },
            {
                title: "Review the latest project requirements",
                description: "Go through the newly updated project requirements document and ensure the team is aligned.",
                createdBy:req.user._id
            },
            {
                title: "Brainstorm ideas for the next marketing campaign",
                description: "Generate creative ideas to engage the target audience and increase brand visibility for the upcoming campaign.",
                createdBy:req.user._id
            },
            {
                title: "Write documentation for the new feature",
                description: "Draft user-friendly documentation that explains the functionality and usage of the newly implemented feature.",
                createdBy:req.user._id
            },
            {
                title: "Attend the team's stand-up meeting",
                description: "Participate in the daily stand-up to share progress updates and coordinate with the rest of the team.",
                createdBy:req.user._id
            },
            {
                title: "Prepare the budget forecast for Q1",
                description: "Analyze the financial data and create a budget forecast for the upcoming quarter, considering expenses and revenue.",
                createdBy:req.user._id
            },
            {
                title: "Update the project roadmap",
                description: "Modify the project's timeline and deliverables based on recent progress and changing priorities.",
                createdBy:req.user._id
            }
        ];
        
        // await Task.insertMany(tasksWithDescriptions)
        const tasks = await Task.find({createdBy:req.user._id}).populate("createdBy")
        console.log(tasks.length,"length")
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
        const tasks = await Task.find({}).populate("createdBy")
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