// Login.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = ()=>{
    fetch(`http://localhost:3030/?name=${name}&password=${password}`,{
      method:'GET',
      
    })
    .then(response=>{
      console.log(response.status)
      if(response.status === 200){
        return response.json()
      }
      return (response.text())
    })
    .then(data=>{
      if(typeof data === 'string')
        throw new Error(data)
      console.log(data)
      localStorage.setItem("username",data.name)
      localStorage.setItem("token",data.token)
      navigate('/');
    })
    .catch((e)=>alert(e.message))
  }

  const handleSingup = () => {
    console.log({name,password})
    fetch('http://localhost:3030/',{
      method:'POST',
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify({name,password})
    })
    .then(response=>{
      console.log(response.status)
      if(response.status === 200){
        return response.json()
      }
      return (response.text())
    })
    .then(data=>{
      if(typeof data === 'string')
        throw new Error(data)
      console.log(data)
      localStorage.setItem("username",data.name)
      localStorage.setItem("token",data.token)
      navigate('/');
    })
    .catch((e)=>alert(e.message))
    };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button onClick={handleSingup}>signup</button>
        <button onClick={handleLogin}>login</button>
      </div>

    </div>
  );
}

export default Login;
