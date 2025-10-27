const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
require('dotenv').config()



const generateToken = (id) =>{
    console.log('JWT value:', process.env.JWT);

    return jwt.sign({ id }, process.env.JWT, { expiresIn: '14d' });
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const UserExists = await User.findOne({ email })
        if (UserExists) {
            return res.status(409).json({ message: 'user already exists' })
        }

        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "server error or registration error" })
        console.log(`error in register ${error}`)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'no user with this email signup' })
        }

        if (await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
        else {
           return res.status(400).json({message:'password incorrect re babab'}) 
        }
    } catch (error) {
        res.status(500).json({ message: 'login error' });
        console.log('login ke pass error')

    }

}