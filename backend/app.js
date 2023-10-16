const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
}));

app.use(express.json()) //middleware to convert body to json 
app.use(express.urlencoded({ extended: true }));


// Get all articles from articles.json
app.get('/data',(req,res)=>{
  
  fs.readFile('articles.json','utf-8',(err,articles)=>{
    
    if(err){
      return res.status(500).send("something wrong in json file")
    }
    
    return res.status(200).send(articles)
  })

})


//update articles with new data
app.post('/data',(req,res)=>{

  let title = req.body.title.trim()
  let author = req.body.author.trim()
  let text = req.body.text.trim()
  
  if(title.length < 6 || author.length < 6 || text.length < 6){
    return res.status(410).send('title, author and text should have minimum length of 6 characters')
  }
  
  fs.readFile('articles.json','utf-8',(err,data)=>{
    
    if(err) return res.status(500).send("something wrong with json file")
    
    let articles = JSON.parse(data)
    
    articles.push({title,text,author})

    fs.writeFile('articles.json',JSON.stringify(articles),(err)=>{
      if(err) return res.status(500).send("something wrong with json file")
      res.status(200).send(articles)
    })

  })

})


//check user exists
app.get('/',(req,res)=>{
  console.log('queryyy')
  console.log(req.query)
  let name = req.query.name.trim()
  let password = req.query.password.trim()
  
  fs.readFile('users.json','utf-8',(err,data)=>{

    if(err) return res.status(500).send("something wrong with json file");

    let users = JSON.parse(data)
    const user_data = users.find((user)=> user.name === name)
    if(user_data === undefined || user_data.password !== password) return res.status(400).send('Invalid user name or passwored')
    console.log(user_data,password,user_data.password)

    return res.status(200).send(user_data)
  })

})


//create new user
app.post('/',(req,res)=>{
  console.log(req.body)
  let name = req.body.name.trim()
  let password = req.body.password.trim()
  const token = uuidv4();
  
  if(name.length < 6 || password.length < 6){
    return res.status(401).send('user name and password should have minimum length of 6 characters')
  }
  
  fs.readFile('users.json','utf-8',(err,data)=>{
    
    if(err) return res.status(500).send("something wrong with json file")
    
    let users = JSON.parse(data)
    const user_data = users.find((user)=> user.name === name)
    if(user_data !== undefined) {
      return res.status(400).send('user name already exists')
    }
    users.push({name,password,token})

    fs.writeFile('users.json',JSON.stringify(users),(err)=>{
      if(err) return res.status(500).send("something wrong with json file")
      console.log('request send success')
      res.status(200).send({name,password,token})
    })
  })

})


app.listen(3030,()=>console.log("listening on port 3030...."))