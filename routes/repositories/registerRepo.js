var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Register=require('../model/registerSchema')

module.exports.getUser=(email,callback)=>{
    console.log(JSON.stringify(email)+' email at repo')
   
    Register.findOne(email).then(result=>{
        callback(null,result)
    }).catch(error=>{
        callback(null,error)
    })
    // .then(result=>{
    //     console.log(result+ JSON.stringify(email)+' data at repo')
    //     callback(result,null)
    // }).catch(error=>{
    //     console.log(error+' eror at repo')
    //     callback(error,null)
    // })
}

module.exports.createUser=(req,callback)=>{
   
    console.log(req.body.credentials.password+' req')
var Reg=new Register({
credentials:{email:req.body.credentials.email,
password:req.body.credentials.password}
})

Reg.save().then(result=>{
    callback(null,result)
})
.catch(error=>{
  callback(null,error)
})

// .then(result=>{
//     console.log('result')
//     callback(null,result)
// }).catch(error=>{
//     console.log('error')
//     callback(error,null)
// })


}
