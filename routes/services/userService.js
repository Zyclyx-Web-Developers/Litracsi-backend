var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var userRepo=require('../repositories/userRepo')
var jwt=require('jsonwebtoken')
var bcrypt=require('bcrypt')
var secret='shhhhh'




module.exports.register=(req,res)=>{
    var email=req.body.credentials.email
    var password=req.body.credentials.password
    var confirmPassword=req.body.credentials.confirmpassword
    console.log(password,  confirmPassword)
    if(password==confirmPassword){

    console.log(email+' pasword at service')
    userRepo.getUser({'credentials.email':email},(err,exist)=>{
        console.log(exist);
       // if(err) throw err
        console.log(JSON.stringify(exist)+' user exists')

         if(exist){

            console.log('in if')
            res.json({
                "Success":false,
                "message":'email already exists'
            })
        }
        else {
            console.log('unique user');
            userRepo.createUser(req,(err,user)=>{
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
    })

    }
    else{
        res.json({
            "success":false,
            "message":"Pasword and confirmpasswords are not matching"
        })
    }
}

module.exports.loginUserCheck=(req,res)=>{
    var email=req.body.credentials.email
userRepo.getUser({'credentials.email':email},(err,user)=>{
    if(err) throw err
    else if(!user){
        res.json({
            "success":false,
            "message":"email not exists, please give valid email or register"
        })
    }else{
        console.log('else')
        var password=req.body.credentials.password
        console.log(user+'  user at service')
        console.log(user.credentials.password+ password+ user.password+' passwords are')

        if(bcrypt.compareSync(password,user.credentials.password)){

            
            var token=jwt.sign(user.credentials.password,secret,{
       
            })
            res.json({
                "success":true,
                "message":"token generated",
                "token":token
            })
        }
        else{
            res.json({
                "success":false,
                "message":"email and passwords are not matching"
            })
        }

      

            if(err){
                res.json({
                    "success":false,
                    "message":'Please send token'
                })
                
            }
            else{
                    res.json({
                        "success":true,
                        "message":'token generated',
                        "token":token
                    })
            }
        
    }

})


}
