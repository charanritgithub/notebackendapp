import express from "express"
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()   
  
router.post('/register', async (req,res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({email})
        if (user){
            return res.status(401).json({success:false, message:"User Already exists "})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User ({
            name, email, password: hashPassword
        })

        await newUser.save()

        return res.status(200).json({success:true, message: "Account Created Successfully"})

    }catch(error){
        return res.status(500).json({success:false, message: "Error in Adding User"})

    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user){
            return res.status(401).json({success:false, message:"User Not exists "})
        }

        const checkPossword = await bcrypt.compare(password, user.password)

        if(!checkPossword){
            return res.status(401).json({success:false, message:"Wrong Credentials"})

        }

        const token = jwt.sign({id:user._id}, "screatKeyofnoteapp@8688",{expiresIn:"30h"})

        return res.status(200).json({success:true, token, user:{name: user.name}, message: "Login Successfully"})

    }catch(error){
        return res.status(500).json({success:false, message: "Error in Login server"})

    }
})

router.get('/verify', async (req, res) =>{
    return res.status(200).json({success:true,user: req.user})
})

export default router