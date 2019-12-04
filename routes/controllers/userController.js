var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var userService=require('../services/userService')
//var Register=require('../model/registerSchema')

router.post('/register',(req,res)=>{
    console.log(req.body.credentials.email+' email at control')

    return userService.register(req,res,(err)=>{
        if(err) throw err
    })
})


router.post('/login',(req,res)=>{
    return userService.loginUserCheck(req,res);
})

module.exports=router