const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path =require('path');
const foodItems = require('./routes/api/foodItems');

//CORS enabled
 app.use(cors());
 app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
 
   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
 
   // Pass to next layer of middleware
   next();
 });
 
// Bodyparser Middleware
app.use(express.json());


//Db config
//1st line is fot local dev, 2nd line is for Mongo Atlas
// mongoose.connect(process.env.DATABASEURL, {
mongoose.connect("mongodb://localhost:27017/restaurant",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
 }).then(()=> {
    console.log("connected to Db!!!");
 }).catch(err => {
    console.log("ERROR", err.message);
 });

//use routes
app.use('/api/foodItems', foodItems);

// Serve static assets if in production
if(process.env.NODE_ENV==='production'){
   app.use(express.static('client/build'))

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}

const port =  process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server listening on port ${port}`));