import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const getUsers = async(req,res) => {
    try {
        const users = await prisma.users.findMany()
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get Users!"})
    }
}

export const profilePost = async(req,res) => {
    const tokenUserId = req.userId
    console.log(tokenUserId);
    
    const id = req.params.id;
    try {
        const post = await prisma.post.findMany({
            where : { userId: tokenUserId },
        })
        res.status(200).json(post)

    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get Profile Posts!"})
    }
}


export const getUser = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await prisma.users.findUnique({
                where : { id },
        });
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get User!"})
    }
} 



export const updateUser = async(req,res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password,avatar, ...body} = req.body
    if(id!=tokenUserId){
        res.status(403).json({message: "Not Authorized"});
    }
    let updatedPassword = null
    if(password){
        updatedPassword = await bcrypt.hash(password,10);
        console.log(updatedPassword);
    }

    try {
        const updatedUser = await prisma.users.update({
            where : {id},
            data : {...body,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            },
        })
        const {password: userPassword, ...rest} = updatedUser
        res.status(200).json(rest);
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Update User"})
    }
}
export const deleteUser = async(req,res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if(id!=tokenUserId){
        res.status(403).json({message: "Not Authorized"});
    }
    try {
        await prisma.users.delete({
            where : {id},
        })
        res.status(200).json({message:"User Deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Delete User"})
    }
}