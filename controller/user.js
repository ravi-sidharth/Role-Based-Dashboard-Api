const { User } = require("../model/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "This email already exist, Please try again with another email!"

            })
        }

        // salt password
        const salt = await bcrypt.genSalt(10)
        console.log("salt", salt)

        // hash password 
        const hashPassword = await bcrypt.hash(password, salt)
        console.log("hashPassword", hashPassword)

        const newUser = new User({
            name,
            email,
            password: hashPassword,
        })
        await newUser.save()

        res.status(201).json({
            success: true,
            data: newUser
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

const userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not exists!"
            })
        }

        const checkedPassword = await bcrypt.compare(password, user.password)
        if (!checkedPassword) {
            return res.status(401).json({
                success:false,
                message:"Invalid Credential!"
            })
        }
        
        // generate jwt signin token 
        const payload = {
            _id :user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role
        }
        const token = jwt.sign(payload,process.env.secret)

        res.status(200).json({
            success:true,
            message:"User Logged in successfully",
            token
        })
        

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
}

module.exports = {
    userSignUp,
    userLogIn
}