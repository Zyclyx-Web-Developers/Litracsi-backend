var mongoose=require('mongoose')
var express=require('express');
var router=express.Router();
console.log('in schema')
// var registerSchema=mongoose.Schema({
//     credentials:{
//         email:{type:String,required:true},
//         password:{type:String,required:true}
//     },
//     applicationInformation:{
//         prefix:{type:String, required:true},
//         name:{firstname:{type:String, required:true},middlename:{type:String},lastname:{type:String}},
//         dateofbirth:{dob:{type:String,required:true},age:{type:Number}},
//         gender:{type:String},
//         nationality:{type:String,required:true}
//     },
//     currentEmployment:{
//         currentEmployer:{type:String},
//         employerAddress:{type:String},
//         otherDetails:{district:{type:String,required:true,
//             city:{type:String,required:true},duration:{type:String},state:{type:String,required:true},
//             postalcode:{type:Number},position:{type:String},country:{type:String,required:true},
//             jobtype:{type:String}
//         }}
//     },
//    previousEmployment:{
//        employment1:{institute:{type:String},position:{type:String},duration:{type:String}},
//        employment2:{institute:{type:String},position:{type:String},duration:{type:String}},
//        employment3:{institute:{type:String},position:{type:String},duration:{type:String}}
//    },
//    educationalDetails:{
//        qualification1:{institute:{type:String},course:{type:String},yearofpassing:{type:Number}},
//        qualification2:{institute:{type:String},course:{type:String},yearofpassing:{type:Number}},
//        qualification3:{institute:{type:String},course:{type:String},yearofpassing:{type:Number}}

//    },
//    communicationAddress:{
//     communicationDetails:{houseno:{type:String},street:{type:String},district:{type:String},
//         city:{type:String},state:{type:String},state:{type:String},country:{type:String},
//         postalCode:{type:String},mobile:{type:Number},landLine:{type:String},email:{type:String}
//     },
//     professionalDetails:{
//         medicalCouncilNomber:{type:String},
//         speciality:{type:String},
//         subSpeciality:{type:String}
//     },
//     references:{
//         reference1:{name:{type:String},position:{type:String},email:{type:String},contactNo:{type:String}},
//         reference2:{name:{type:String},position:{type:String},email:{type:String},contactNo:{type:String}},
//         reference3:{name:{type:String},position:{type:String},email:{type:String},contactNo:{type:String}}
//     },
//     signatures:{type:String},date:{type:String}
//    }


// })
var Register=mongoose.Schema;
var registerSchema=Register({
    credentials:{
        email:{type:String},
        password:{type:String},
     //   confirmpassword:{type:String}
    
    }
 }
// { typeKey: '$type' }
)

module.exports=mongoose.model('Register',registerSchema)
