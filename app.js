const e = require("express")
const express  = require("express") //import packages
const app = express()// execute package
const path = require('path')//is a built-in Node.js module for working with file and directory paths.

const userRoute=require("./userRoutes");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv/config");
//how to controll the webpage
// app.get('/',(req,res)=>{
//     res.send("<h1>hello</>")
// })

// to call our html page
//any files inside the public directory an be accessed directly in the browser.
app.use(express.static(path.join(__dirname, 'public')))
/*express.static() is a middleware function in Express.js that 
serves static files such as HTML, CSS, JavaScript, and images.*/
app.get('/',(req,res)=>{
    /*sends the index.html file located in 
    the public directory to the client and ensure that the correct path is sent */
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})



//middleware 
app.use(express.json()); // ✅ This is required to parse JSON requests

app.use('/posts', ()=>{ // example => we can use this to check user authentication when you enter the home page
    console.log("this is a middleware running")
})
app.use('/users',userRoute);
// routes
// '/' => the path (root)
app.get('/', (req,res)=>{ // post, patch, delete
    res.send("we are on home")
})
//'/posts' changes the path
app.get('/posts', (req,res)=>{ // post, patch, delete
    
    res.send("we are on posts")
})
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log(err);
})
// start lestining to the server

app.listen(3000,()=>{
    console.log("started successfully");
})