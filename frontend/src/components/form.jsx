import { useState } from "react";

function Form({articles,setArticles}){
  let [article,setArticle] = useState({article:"",title:""})
  let [title,setTitle] = useState("")
  let [text,setText] = useState("")

  //add a article to server
  function add_article(){
    fetch('http://localhost:3030/data',{
      method:'POST',
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify({title,text,author:localStorage.getItem('username')})
    })
    .then((response)=>{
      if(response.ok) return response.json() 
      return response.text()
    })
    .then(data=>{ 
      if(typeof data === 'string')
        throw new Error(data)
      setArticles(data)
      setTitle("")
      setText("")
    })
    .catch(e=>alert(e.message))
  }

  return(
    <div className="form">
      <input type='text' placeholder="title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
      <textarea id='text' placeholder="text..." rows='5' onChange={(e)=>{setText(e.target.value)}} value={text}>
      </textarea>
      <button onClick={()=>add_article()}>Add</button>
    </div>
  ) 
}

export default Form;