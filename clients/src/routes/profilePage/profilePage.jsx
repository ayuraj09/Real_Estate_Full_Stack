import {Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import List from "../../components/list/List.jsx"
import Chat from "../../components/chat/Chat.jsx"
import "./profilePage.scss";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
 
function ProfilePage() {

  const navigate = useNavigate()

  const {currentUser, updateUser} = useContext(AuthContext);
  
const handleLogout = async ()=>{
  try {
    await apiRequest.post("/auth/logout")
    updateUser(null)
    navigate("/login")
  } catch (error) {
    console.log(err);
  }
}
const data = useLoaderData()
console.log(data);

  return(
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to = "/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to = "/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}>
              { 
              (postResponse) => 
                <List posts = {postResponse.data}/>
              }
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}>
              {(chatResponse) =><Chat chats={chatResponse.data}/>}
             
            </Await>
          </Suspense> 
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
