import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from "../services/emailSet.js";
const SECRETKEY = "mysecretkey"

export const registerUser = async(req, res)=>{
    try {
        const{name,phone,email,password} = req.body;

        const userexist = await User.findOne({email:email});

        if(userexist){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = await User.create({
            name:name,
            email:email,
            phone:phone,
            password:hashedPassword
        })



        await sendEmail(email,'welcome to sociaal connect',
            `<div>welcome to social connect ${name}</div>`
        )

        res.status(201).json({
            success:true,
            message:"data succesfully submited"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
                success:false,
                message:"user already exist"
            })
    }
    
}