import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import { useContext } from "react";
import { authContext } from "../../context/authContext.jsx";
// import {updateUser} from "../../context/authContext.jsx"

function Login() {

    const {updateUser} = useContext(authContext)

    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      setIsLoading((true))
      const formdata = new FormData(e.target);
      const username = formdata.get("username")
      const password = formdata.get("password")
      console.log(username,password);
      try {
        const res = await apiRequest.post('/auth/login', {
          username,
          password
        })
        setError("")
        updateUser(res.data);
        navigate("/")
      } catch (err) {
        console.log(err);
        setError(err.response.data.message)
      }finally{
        setIsLoading(false)
      }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />

          <button disabled = {isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
