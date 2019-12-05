var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Register=require('../model/registerSchema')
var bcrypt=require('bcrypt')


// get user data

module.exports.getUser=(email,callback)=>{
    console.log(JSON.stringify(email)+' email at repo')
   
    Register.findOne(email).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })
}
//storing of user details on database

module.exports.createUser=(req,callback)=>{
   
    console.log(req.body.credentials.password+' req')
var Reg=new Register({
credentials:{email:req.body.credentials.email,
    name:req.body.credentials.name,
password:bcrypt.hashSync(req.body.credentials.password,10)}
})

Reg.save().then(result=>{
    callback(null,result)
})
.catch(error=>{
  callback(null,error)
})
}

//validation of username and password

module.exports.loginUserCheck=(email,callback)=>{

    Register.findOne(email).then(result=>{
        console.log(result+' result at repo')
        callback(null,result)
    })
    .catch(error=>{
        callback(null,error)
    })

}

module.exports.update=(email,password,callback)=>{
    console.log(email, password)
  
    Register.updateOne(email,password)
   .then(result=>{
        callback(null,result)
    })
    .catch(error=>{
        callback(null,error)
    })
}
