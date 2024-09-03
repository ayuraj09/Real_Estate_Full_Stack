import { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";

function Login() {

  const [error,setError] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    formdata = new FormData(e.target);

    const username = formdata.get("username")
    const password = formdata.get("password")
    console.log(username,password);
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login",{
        username,
        password
      })
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
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
