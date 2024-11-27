import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const getChats = async(req,res) => {
    const tokenUserId = req.userId
    try {
        const chats = await prisma.chat.findMany({
                where : {
                    userId : {
                        hasSome : [tokenUserId],
                    }
                }
            }
        )
        for(const chat of chats){
            const recieverId = chat.userId.find((id) =>id != tokenUserId)
            const reciever = await prisma.users.findUnique({
                where : {
                    id : recieverId,
                },
                select : {
                    id : true, 
                    username : true,
                    avatar : true
                }
            })
            chat.reciever = reciever;
        } 
        res.status(200).json(chats)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get chats!"})
    }
}

export const getChat = async(req,res) => {
    const tokenUserId = req.userId
    try {
        const personChat = await prisma.chat.findUnique({
            where : {
                id : req.params.id,
                userId : {
                    hasSome : [tokenUserId],
                },
            },
            include : {
                messages : {
                    orderBy : {
                        createdAt : "asc"
                    }
                }
            }
        })
        await prisma.chat.update({
            where : {
                id : req.params.id
            },
            data : {
                seenBy : {
                    set : [tokenUserId],
                }
            }

        })
        res.status(200).json(personChat)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get Users!"})
    }
}
export const addChat = async(req,res) => {
    const tokenUserId = req.userId
    try {
        const newChat = await prisma.chat.create({
            data : {
                userId : [tokenUserId, req.body.recieverId]
            }
        })
        res.status(200).json(newChat)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to send Message!"})
    }
}
export const readChat = async(req,res) => {
    const tokenUserId = req.userId
    try {
        const chat = await prisma.chat.update({
            where : {
                id : req.params.id,
                userId : {
                    hasSome : [tokenUserId]
                }
            },
            data : {
                seenBy : {
                    set : [tokenUserId],
                }
            }
        })
        res.status(200).json(chat)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "NO Messages"})
    }
}
