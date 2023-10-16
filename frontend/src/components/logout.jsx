import React from "react";


const handleLogout = () => {

  // Remove token and username from local storage.
  localStorage.removeItem('token');
  localStorage.removeItem('username');
    
  // Redirect to the login page. 
  window.location.href = '/login';
  
  }

export default handleLogout;