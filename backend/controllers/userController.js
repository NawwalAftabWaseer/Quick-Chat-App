import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body

        if(!fullName || !username || !password || !confirmPassword || !gender ){
            return res.status(400).json({message:"all fields are required"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password must match"})
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({message:"user already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10)

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
        await User.create({
            fullName, username, password:hashedPassword, profilePhoto:gender === "male"? maleProfilePhoto: femaleProfilePhoto , gender 
        })
        return res.status(201).json({message:"account created successfully"})
    }catch(e){
        console.log("error in register of userController", e)
    }
}

export const login = async(req,res)=>{
    try{
        const {username, password} = req.body
        if(!username || !password ){
            return res.status(400).json({message:"all fields are required"})
        }
        const user = await User.findOne({username})
        if(!user){
            res.status(400).json({
                message:"incorrect username or password",
                success:false
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            res.status(400).json({
                message:"incorrect username or password",
                success:false
            })
        }
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY )
        return res.status(200).cookie("token",token ).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto,
        })

    }catch(e){
        console.log("error ->>>>", e)
    }
}

export const logout = (req,res) => {
   try{
    return res.status(200).cookie("token","").json({
        message:"logout successfull"
    })
   }catch(e) {
    console.log("error ->>>>>>", e)
   }
}

export const getOtherUsers = async(req,res)=>{
    try{
        const loggedInUserId = req.id
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(otherUsers)
    }catch(e){
        console.log("Error occuring",e)
    }
}
