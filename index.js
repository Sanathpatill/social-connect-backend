
import express from 'express'
import mongoConnection from './db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './Routes/authRoutes.js'
dotenv.config()

const app = express()
app.use(express.json())

mongoConnection()
app.use(cors())
const PORT = process.env.PORT
// test api(optional)
app.get("/test",(req,res)=>{
     res.send("hello world")
})

//middlewear
 app.use("/user",userRouter)


app.listen(PORT,()=>{
    console.log("express started"+PORT)
})

