import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email,setEmail]=useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    console.log('New Username:', newUsername);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div className="login-container">
        <div  className="login-form">
      <p>Create a new account:</p>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <hr />
      <input
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <hr />
      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <hr />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <hr />
      <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default Signup;