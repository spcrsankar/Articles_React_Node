import React, { useEffect } from "react";
import ViewArticle from './components/ViewArticle';
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Navbar from "./components/navbar";
import './styles.css';
import Login from './components/login';
import Form  from "./components/form";

function Home() {

  const navigate = useNavigate();
  const [articles,setArticles] = useState([])

  const username = localStorage.getItem('username');
  if (!username) {
    navigate('/login'); // Redirect to login if not logged in
  }

  //get articles data from sever
  useEffect(()=>{
    fetch('http://localhost:3030/data',{
      method:'GET'
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setArticles(data)
    })
  },[articles])
  

  return (
    <>      
      {username?<> 
      <Navbar />
      <Form articles={articles} setArticles={setArticles}/>
      <div className="home">
        { 
        articles && articles.map((article, index) => (
          <ViewArticle
            key={index}
            article={article}
          />
        ))}
      </div>
      </>:<Login/>}
    </>
  );
}
export default Home;