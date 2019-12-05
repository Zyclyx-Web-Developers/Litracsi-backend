var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var userRepo=require('../repositories/userRepo')
var jwt=require('jsonwebtoken')
var bcrypt=require('bcrypt')
var secret=process.env.secret
var nodemailer=require('nodemailer')
var randomstring=require('randomstring')

console.log(secret+' secret')


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

module.exports.forgotpassword=(req,res)=>{
    var email=req.body.credentials.email
    //var randomstring=randomstring.generate();
    var random=randomstring.generate(8);
    
    console.log(email+' email'+random+' random string')
    userRepo.getUser({'credentials.email':email},(err,exists)=>{
        if(err) throw err
        else if(!exists){
            console.log('no email exists')
            res.json({
                "success":false,
                "message":"email not found.. please provide valid email"
            })
        }
        else{
            console.log(exists.credentials.name, exists.credentials.email+' data at service forgotpwd')
            console.log(process.env.user, process.env.password, process.env.from, exists.credentials.email, process.env.to)

            userRepo.update({'credentials.email':email},{'credentials.password':bcrypt.hashSync(random,10)},(err,done)=>{
                if(err) throw err
                else{
                    console.log(done)
            var transporter=nodemailer.createTransport({
                service:'gmail',
               auth: {
                    user:process.env.user,
                    pass:process.env.password
                }
            })
            console.log(' in mail')

            var mailOptions={
                
                from:process.env.from,
                to:exists.credentials.email,
                subject:'forgot password mail from Litracsi',
                text:'Dear '+exists.credentials.name+'\n\n'+'Your new password is '+random+'\n'+'Please donot share this password to any one and set new password after login using new password.'+'\n\n'+'Thanks and regards'+'\n'+'Litracsi'
            }
            console.log(random)
            transporter.sendMail(mailOptions,(err,email)=>{
                if(err) throw err
                console.log('email sent')
                res.json({
                    "success":true,
                    "message":"Password sent to registered email"
                })
           
            })

        }
    })

        }
    })
}

module.exports.validateUser=(req,res)=>{
    var email=req.body.credentials.email
    var password=req.body.credentials.password
    userRepo.getUser({'credentials.email':email},(err,exists)=>{
        if(err) throw err
        else if(!exists){
            res.json({
                "success":false,
                "message":"please enter valid email"
            })
        }
        else{
            console.log(password,email)
            console.log(exists.credentials.email+ exists.credentials.password+' data for validate user in service')
            if(bcrypt.compareSync(password,exists.credentials.password)){
                res.json({
                    "success":true,
                    "message":"Validated succesfully"
                })
            }
            else{
                res.json({
                    "success":false,
                    "message":"invalid password"
                })
            }

        }
    })
}

module.exports.resetPassword=(req,res)=>{
    var email=req.body.credentials.email
    var password=req.body.credentials.password
    var confirmpassword=req.body.credentials.confirmpassword
    if(password==confirmpassword){
    userRepo.getUser({'credentials.email':email},(err,exists)=>{
        console.log(password,confirmpassword,exists)
        if(err) throw err
        else if(!exists){
            res.json({
                "success":false,
                "messsage":"Please enter valid email"
            })
        }
        else{
            console.log(exists.credentials.email)
            userRepo.update({'credentials.email':email},{'credentials.password':bcrypt.hashSync(password,10)},(err,updated)=>{
                if(err){
                    res.json({
                        "success":false,
                        "messsage":"Something went wrong.. please try later"
                    })
                }
                else{
                res.json({
                    "success":true,
                    "messsage":"password resetted succesfully"
                })
            }
            })
           
        }
    })
}
else{
    res.json({
        "success":false,
        "messsage":"Passwords are not matching"
    })
}

}
