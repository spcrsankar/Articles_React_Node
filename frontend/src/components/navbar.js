import React from 'react';
import handleLogout from './logout';
import img from '../assets/compLogo.png';
import user_logo from '../assets/userLogo.png'
import '../styles.css'; 

function Navbar() {
  const username = localStorage.getItem('username');

  return (
    <div className="navbar">
      <div className="logo">
        <img src={img} alt="companyLogo" />
      </div>
      <h1>Write your Article</h1>
      <div className='nav-right'>
        <div>
          <img src={user_logo} alt="companyLogo" />
          <h3>{username}</h3>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
