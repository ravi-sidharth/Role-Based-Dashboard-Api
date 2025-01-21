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
                message: "User already exist, Please try again with another email!"

            })
        }

        
        // hash password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //create a new user and save in database
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        })
        await newUser.save()

        if(newUser) {
            res.status(201).json({
                success: true,
                message: "User registered successfully!",
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to register user! please try again.", 
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Some error occured!, Please try again."
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
                message: "User doesn't exists!"
            })
        }

        const checkedPassword = await bcrypt.compare(password, user.password)
        if (!checkedPassword) {
            return res.status(401).json({
                success:false,
                message:"Invalid Credentiasl!"
            })
        }
        
        // generate jwt user token 
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
            message:"Some error occured! Please try again."
        })
    }
}

module.exports = {
    userSignUp,
    userLogIn
}