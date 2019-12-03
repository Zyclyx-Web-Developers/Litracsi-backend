var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var registerService=require('../services/registerService')
//var Register=require('../model/registerSchema')

router.post('/register',(req,res)=>{
    console.log(req.body.credentials.email+' email at control')

    return registerService.register(req,res,(err)=>{
        if(err) throw err
    })
})
module.exports=router