const express = require(`express`)
const addressRouter = express.Router()
const mongoose = require(`mongoose`)
const userdata = mongoose.model(`userdata`)
const address = mongoose.model(`address`)
const checklogin = require(`../middleware/checklogin.js`)

addressRouter.post(`/address/` ,checklogin, (req,res)=>{
    const {houseNo , city , pincode} = req.body

    if(!houseNo || !city || !pincode){
        return res.status(403).json({error : "Please fill all the fields"})
    }
    else if(pincode.length!=6){
        return res.status(403).json({error : "Pincode is not valid"})
    }
    address.findOne({houseNo:houseNo,city:city,pincode:pincode})
    .then((copyFound)=>{
        if(copyFound){
            console.log(`matched address in database`)
            return res.status(403).json({error:"This address is already registered"})
        }
        else{
            // console.log(req.user)    
    const newAddress = new address({
        houseNo,
        city,
        pincode,
        userRef : req.user._id
    })
    // console.log(newAddress)
    newAddress.save()
    .then((storedAddress)=>{
        console.log(`address stored successfully`)
        res.status(200).json({address : storedAddress})
    })
    .catch((err)=>{
        res.json({error : "while storing the address"})
    })
        }
       
    }).catch((err)=>{
        return res.json({error : "while matching address"})
    })
    
})


addressRouter.get(`/address/` ,checklogin , (req,res)=>{
    // console.log(req.user)
    const user = req.user
    address.find({userRef : user._id})
    .then((allAddress)=>{
        const userInfo = []
        for(let t of allAddress){
            const {houseNo , city , pincode} = t
            const obj = {
                houseNo,
                city,
                pincode,
                user : {
                    _id : user._id,
                    name : user.name,
                    email : user.email
                }
            }
            userInfo.push(obj)
        }
   
            res.status(200).json({allAddress:userInfo})

    })
})

addressRouter.get(`/display/`,(req,res)=>{
    address.find()
    .then((addressBook)=>{
        const userInfo = []
        for(let t of addressBook){
            const {houseNo,city,pincode,userRef} = t 
            userdata.findById(userRef)
            .then((user)=>{
                // console.log(user)
            const obj = {
                houseNo,
                city,
                pincode,
                user : {
                    _id : user._id,
                    name : user.name,
                    email : user.email
                }
            }
            userInfo.push(obj)
            // console.log(obj)
            console.log(userInfo)
        })
        }
        console.log(userInfo)
        res.status(200).json({allAddress:userInfo})
    })
    .catch((err)=>{
        console.log(err.message)
    })
})

module.exports = addressRouter