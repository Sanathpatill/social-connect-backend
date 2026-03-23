import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRETKEY

const authUser = async(req,res,next)=>{
    try {
        const token = req.header("auth-token");
        if(!token){
            return res.json({
                success:false,
                message:"token required"
            })
        }
        const decoded = jwt.verify(token,SECRET_KEY)//payload
        req.sanath = decoded;
        next()
    } catch (error) {
        res.json({
            success:false,
                message:" invalid token " 
        })
    }
}
export default authUser;