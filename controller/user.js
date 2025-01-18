const { User } = require("../model/user")
const bcrypt = require('bcryptjs');

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

        return res.status(201).json({
            success: true,
            data: newUser
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not exists!"
            })
        }

        checkedPassword = await bcrypt.compare(password, user.password)
        if (!checkedPassword) {
            return res.status(401).json({
                success:false,
                message:"Invalid Credential!"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Logged in successfully"
        })
        

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}

module.exports = {
    userSignUp,
    userLogIn
}