import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        
     navigate("/");
        
      }  
  return (
    <nav>
      <ul>
        <li>
          <Link to="/adminportal">product dashboard</Link>
        </li>
        <li>
          <Link to="/generatelicense">license dashboard</Link>
        </li>
        <li className="logout">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;