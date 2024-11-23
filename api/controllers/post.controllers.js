import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const getPosts = async(req,res) => {
    const query = req.query; 
    console.log(query);
    try {
        const post = await prisma.post.findMany({
            where : {
                city : query.city || undefined,
                type : query.type || undefined,
                property : query.property || undefined,
                bathroom : parseInt(query.bathroom) || undefined,
                bedroom  : parseInt(query.bedroom ) || undefined,
                price    : {
                        gte : parseInt(query.minPrice) || undefined,
                        lte : parseInt(query.maxPrice) || undefined,
                },
            },
        });
        
        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get Posts!"})
    }
}

export const getPost = async(req,res) => {
    
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where : { id },
            include:{
                postdetail:true,
                user:{
                    select :{
                        email:true,
                        username:true,
                        avatar:true
                    }
                }
            }
        })
        res.status(200).json(post)

    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Get Posts!"})
    }
}


export const addPost = async(req,res) => {
    const body = req.body
    const tokenUserId = req.userId
    try {
        const newPost = await prisma.post.create(
            {
                data:{
                    ...body.postData,
                    userId : tokenUserId, 
                    postdetail : {
                        create:body.postdetail,
                    }
                }
            }
        )
        res.status(200).json(newPost)
    }
     catch (err) {
        console.log(body)
        console.log(err);
        res.status(500).json({message : "Failed to add Posts!"})
    }
}


export const updatePosts = async(req,res) => {
    try {
        const post = await prisma.users.findMany()
        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({message : "Failed to Update Posts!"})
    }
}


export const deletePost = async (req, res) => {
    const tokenUserId = req.userId
    console.log(tokenUserId);
    const id = req.params.id;
    try {
      const post = await prisma.post.findUnique({
        where: { id },
      });

      
  
      if (post.userId !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
      }
  
      await prisma.post.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post" });
    }
  };