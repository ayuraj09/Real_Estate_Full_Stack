import dotenv from 'dotenv';
import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors' 
import postRouter from "./routes/post.routes.js";
import authRouter from "./routes/auth.routes.js";
import testRouter from "./routes/test.routes.js";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messsageRouter from "./routes/message.routes.js";

dotenv.config()

const app = express();
const env = 'prod';

// Set origin based on environment
const origin = env === 'dev' 
  ? 'http://localhost:5173' 
  : 'https://realestatefrontend-nu.vercel.app';

app.use(cors({
  origin: origin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use("/api/post", postRouter) 
app.use("/api/users", userRouter) 
app.use("/api/auth", authRouter) 
app.use("/api/test", testRouter) 
app.use("/api/chats", chatRouter) 
app.use("/api/messages", messsageRouter) 

app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:8800");
  });
