import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './App.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/web-app/api/users/login', {
        email: username, // Assuming the username is the email, adjust as needed
        password: password
      });

      if (response.status === 200) {
        console.log(response.data.message);
        // Navigate to another route upon successful login
        navigate('/userportal'); // Replace '/dashboard' with the path you want to redirect to
      }
    }catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
    try {
        const response = await axios.post('http://localhost:4000/web-app/api/admins/login', {
          email: username, // Assuming the username is the email, adjust as needed
          password: password
        });
  
        if (response.status === 200) {
          console.log(response.data.message);
          // Navigate to another route upon successful login
          navigate('/addproduct'); // Replace '/dashboard' with the path you want to redirect to
        }
      }catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <p>Log in to your account:</p>
        <input
          type="text"
          placeholder="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <hr />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr />
        <button onClick={handleLogin}>Log In</button>
        <br />
        <hr/>
        <button onClick={handleSignupClick}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
