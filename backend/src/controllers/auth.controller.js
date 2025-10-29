
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerUser(req, res) {
    try {
        const { name, email, password, profileImageUrl } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            })
        }

        const isUserAlreadyExists = await UserModel.findOne({ email: email })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        })

        const token = jwt.sign({
            id: user._id,
        }, '0a16210099db6e083757d93dbd96a095')
        res.cookie('token', token)

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                profileImageUrl: user.profileImageUrl
            }
        })
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, '0a16210099db6e083757d93dbd96a095')

        res.cookie('token', token)

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                profileImageUrl: user.profileImageUrl
            }
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getUserProfile(req, res) {
    try {
        const getUserId = req.user.id;

        // Pass the ID directly (not as an object)
        const user = await UserModel.findById(getUserId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = { registerUser, loginUser, getUserProfile }