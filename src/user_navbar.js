import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Usernavbar() {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        
      navigate('/');
        
      }  
  return (
    <nav>
      <ul>
        <li>
          <Link to="/activatelicense">activate license</Link>
        </li>
        <li>
          <Link to="/userlicense">your licenses</Link>
        </li>
        <li className="logout">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Usernavbar;