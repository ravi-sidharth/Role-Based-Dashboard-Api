const jwt = require('jsonwebtoken')

const userAuth = async (req,res,next) => {
    try {
        const authHeader  = req.headers['authorization']
        // console.log(authHeader,"authHeader")
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"No token found, Please login again to continue!"
            })
        }

        const decodedTokenInfo = jwt.verify(token,process.env.secret)
        // console.log(decodedTokenInfo)

        req.user = decodedTokenInfo 
        next()

    } catch(err) {
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went Wrong, Please login Again to continu!"
        })
    }
}

module.exports = userAuth