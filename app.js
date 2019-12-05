const express=require('express');
var app=express();

var bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
var env=require('dotenv').config()
var port=process.env.port
var mongoose=require('mongoose')
var db=require('./routes/database/db')

var url=db.url;
console.log(url+' url')
mongoose.connect(url)
console.log(port+' port')
var register=require('./routes/controllers/userController');{
    app.use('/register',register)
}

app.listen(port,(err)=>{
if(err) throw err
console.log('Server is running at port '+port)
})