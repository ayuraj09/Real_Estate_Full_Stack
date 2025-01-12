import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from 'timeago.js'
import { SocketContext } from "../../context/SocketContext";

function Chat({chats}) {

  const [chat, setChat] = useState(null);
  const  {currentUser} = useContext(AuthContext)
  const {socket} = useContext(SocketContext)


  const messageEndRef = useRef();

  // const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

    
  const handleOpenChat = async (id,reciever) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({...res.data, reciever})
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text  = formData.get("text")    
    if(!text) return;
    try {
      const res = await apiRequest.post("messages/"+chat.id, {text});
      console.log(res);
      
      setChat((prev)=>({...prev , messages: [...prev.messages, res.data ]}))
      e.target.reset();     
      
      socket.emit("sendMessage",  {
        recieverId : chat.reciever.id,
        data : res.data  
      }
      )
      
    } catch (error) {
      console.log(err);
    }
  }
  
  useEffect(()=>{

    const read = async  () => {
      try {
        await apiRequest.put("/chats/read/"+ chat.id)
      } catch (error) {
        console.log(error);
        
      }
    }

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return ( 
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {
          chats.map(c=>(
            <div className="message" key = {c.id}
            style = {{backgroundColor:c.seenBy.includes(currentUser.id) || chat?.id === c.id
            ? "white" 
            : "cyan"}} onClick={() => handleOpenChat(c.id,c.reciever)}>              
          <img
            src={c.reciever.avatar || "/noavatar.png"}
            alt=""
          />
          <span>{c.reciever.username}</span>
          <p>{c.lastMessage}</p>
        </div>
          ))
        }
      </div>      
      {chat && console.log(chat)
      } 
      {chat && (
        
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.reciever.avatar || "noavatar.png"}
                alt=""
              />
              {chat.reciever.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>

          <div className="center">
            {
              chat.messages.map(ct=>(
                <div className="chatMessage"
                  style={{
                    textAlign : ct.userId===currentUser.id ? "right" : "left",
                    alignSelf : ct.userId===currentUser.id ? "flex-end" : "flex-start",
                  }}
                key = {ct.id}>
                  <p>{ct.text}</p>
                  <span>{format(ct.createdAt)}</span>
                </div>
              ))
            }
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
          </div>
      )}
    </div>
  );
}

export default Chat;
