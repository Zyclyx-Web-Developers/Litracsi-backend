var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var registerRepo=require('../repositories/registerRepo')


module.exports.register=(req,res)=>{
    var email=req.body.credentials.email
    console.log(req.body.credentials.password,+'email '+email+' pasword at service')
    registerRepo.getUser({email},(err,exist)=>{
        console.log(exist);
       // if(err) throw err
        console.log(JSON.stringify(exist)+' user exists')

         if(!exist){

            console.log('unique user');
            registerRepo.createUser(req,(err,user)=>{
                if(err) throw err
                else if(user){
                    console.log('created')
                    res.json({
                        "Success":true,
                        "message":'User registered succesfully'
                    })   
                }
            })

           
        }
        else{
            
            console.log('in if')
            res.json({
                "Success":false,
                "message":'email already exists'
            })
        }         
    })
}