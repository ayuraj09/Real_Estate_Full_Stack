import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { SocketContext } from "../../context/SocketContext";

function SinglePage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const {currentUser} = useContext(AuthContext)
  const {socket} = useContext(SocketContext)
  const [chat, setChat] = useState(null);

  const post =  useLoaderData();
  console.log(currentUser.id);
  console.log(post.userId);
  
  console.log(post); 

  const handleClick = async () => {
    if (post.userId === currentUser.id) {
      setMessage("You cannot send a message to yourself.");
      setMessageType("error");
      return;
    }
    try {
      const res = await apiRequest.post(`/chats/${currentUser.id}`, 
        {recieverId: post.userId,});
        if (res.data.message === "Chat already exists.") {
          setMessage("Chat already exists! Go to profile for further interaction");
          setMessageType("info"); // blue color for info
          console.log(res.data.chat); // Existing chat details
          return;
        }
        setMessage("Chat created successfully! Go to profile for further interaction");
        setMessageType("success"); // green color for success
        console.log("Chat created successfully:", res.data);
        
      } catch (err) {
        if (err.response) {
          setMessage("Server Error: " + err.response.data);
          setMessageType("error"); // red color for error
          console.error("Server Error:", err.response.data);
        } else if (err.request) {
          setMessage("No response received.");
          setMessageType("error");
          console.error("No response received:", err.request);
        } else {
          setMessage("Error: " + err.message);
          setMessageType("error");
          console.error("Error:", err.message);
        }
      }
    };
  
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postdetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVert ical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>{
                  post.postdetail.utilities ==="owner" ? 
                  (<p>Renter is responsible</p>) :
                  (<p>Tenet is responsible</p>)
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postdetail.pet==="allowed"?
                  <p>Pets allowed</p> :
                  <p>Pets are not allowed</p> 
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                 <p>
                  {post.postdetail.income}
                </p>
                </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postdetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} Bedrooms</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} Bathrooms</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span> School</span>
                <p>{post.postdetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span> Bus Stop</span>
                <p>{post.postdetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span> Restaurant</span>
                <p>{post.postdetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleClick}>
              <img src="/chat.png" alt="" />
              Create Chat
            </button>
            
            {message && (
            <p style={{ 
              color: messageType === 'success' ? 'green' : 
                    messageType === 'error' ? 'red' : 
                    'blue' 
            }}>
              {message}
            </p>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
