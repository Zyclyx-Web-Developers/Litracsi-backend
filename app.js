const express=require('express');
var app=express();
var port=process.env.port||4000
var bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
var mongoose=require('mongoose')
var db=require('./routes/database/db')
var url=db.url;
console.log(url+' url')
mongoose.connect(url)



app.listen(port,(err)=>{
if(err) throw err
console.log('Server is running at port '+port)
})