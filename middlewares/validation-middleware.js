const jwt = require('jsonwebtoken')

const validation = async (req,res,next) => {
    try {
        const authHeader  = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"No token found, Please login again to continue!"
            })
        }
        const decodedTokenInfo = jwt.verify(token,process.env.secret)
        req.user = decodedTokenInfo 
        next()

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Some error occured!, Please login Again to continue"
        })
    }
}

module.exports = validation