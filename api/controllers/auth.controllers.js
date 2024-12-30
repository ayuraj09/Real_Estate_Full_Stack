import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js"


export const register =  async (req,res)=>{
    
    const {username, email, password} = req.body
    try{
        const hashedPassword =  await bcrypt.hash(password,10)
        
        const newUser = await prisma.users.create({
            data : {
                username, email, password : hashedPassword,
            }
        })
        
        console.log(newUser);
        res.status(201).json({message : "userCreated Successfully"})
            
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:"Failed to create"})
        }
    }



export const login = async (req,res)=>{


    const { username, password } = req.body
    try {
        const user = await prisma.users.findUnique({
            where:{username} //username:username this second username is the client side but here both are same  that is why no required
        })

        if(!user ) return res.status(404).json({message:"No user exist! "})

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(404).json({message:"Invalid password! "})
        }
        const age = 1000 * 60 * 60 * 24 * 7
        const token = jwt.sign({
            isAdmin: false,
            id:user.id
        },process.env.JWT_SECRET_KEY,{
            expiresIn:age
        })
        const {password:userpass, ...userdata} = user
        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
        res.cookie("token",token, {
            httpOnly:true,
            secure:true, //we are using locahost but in realwe shuld click secure as per http
            sameSite:"none",
            maxAge:age,
        }).status(200).json(userdata)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({message : "Failed to Login!"})
    }
    // check if exist

    //  is Password correct

    // Generate cookie token then send it to user 
}
export const logout = (req,res)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message : "Please Log-in "})
    }
    res.clearCookie("token").status(200)  .json({message: "Logout Successful!"})
}
