import { useContext,useState } from "react";
import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function ProfileUpdatePage() {

  const [error, setError] = useState("");
  const {currentUser, updateUser} = useContext(AuthContext)
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const username = formdata.get("username")
    const password = formdata.get("password")
    const email = formdata.get("email")
    
    try{
      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username,email,password,avatar:avatar[0 ] 
      })
      updateUser(res.data)
      navigate('/profile')
      console.log(res.data);
      
    }catch(err){
      console.log(err);
      setError(err.response.data.message)
    }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={ avatar[0]  || currentUser.avatar || "/noavatar.png"} alt="" className="avatar" />
      <UploadWidget uwConfig={{
        cloudName : "dawfmoeei",
        uploadPreset : "Estate_App",
        maxImageFileSize: 2000000,
        multiple : false,
        folder : "Avatars",
      }}
      setState = {setAvatar}/>
      </div>

    </div>
  );
}

export default ProfileUpdatePage;
