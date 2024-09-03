import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import postRouter from "./routes/post.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/post", postRouter) 
app.use("/api/auth", authRouter) 

app.listen(8800, () => {
    console.log("Server is running on http://localhost:8800");
  });