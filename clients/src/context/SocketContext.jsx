import {createContext, useState, useEffect, useContext } from "react";
import {io} from "socket.io-client"
import { AuthContext } from "./AuthContext";

const env = 'prod';

export const SocketContext = createContext()

export const SocketContextProvider = ({children}) => {

    const [socket,setSocket] = useState(null)
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        setSocket(io(
            env === "dev"
          ? "http://localhost:4000/"
          : "https://realestatechatservice.onrender.com"
        ));
    },[])


    useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id);
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value = {{socket}}>{children}</SocketContext.Provider>
    )
}
