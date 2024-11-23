import express from "express"
import {getUser,updateUser,getUsers,deleteUser, profilePost} from "../controllers/user.controllers.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()
 
router.get("/",getUsers)
router.get("/profilepost",verifyToken, profilePost)
router.get("/:id", verifyToken, getUser)
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser )

export default router
  