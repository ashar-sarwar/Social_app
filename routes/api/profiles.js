const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get("/test",()=>console.log("profiles here"))

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
const errors = {}
    Profile.findOne({user:req.user.id})
.then(profile=>{
    if(!profile){
        errors.noProfile='No profile of this user'
        return res.status(400).json(errors)
    }
    res.json(profile)
})
.catch(error=>res.status(404).json(error))
})

module.exports = router