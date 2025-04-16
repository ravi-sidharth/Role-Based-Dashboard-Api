const adminAuth = async (req,res,next) => {
    try{
        if (req.user.role=="admin") {
            // res.status(200).json({
            //     success:true,
            //     // message:"Welcome to the admin Page!"
            // })
            next()
        }
        else {
            return res.status(403).json({
                success:false,
                message:"Access denied, You are not authorized Person!"
            })
        }
        
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Some error occured!, Please login again to continue."
        })
    }
}

module.exports = adminAuth

