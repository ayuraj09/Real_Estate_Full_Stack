import express from "express"

const router = express.Router()

router.get("/test", (req,res)=>{
    res.send("<h1>AYUHS</h1>")
})

export default router
