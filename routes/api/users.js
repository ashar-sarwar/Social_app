const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/keys');



router.get("/test", () => console.log("users here"));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200", //size
      r: "pg", //rating --> Ex: pg-rated etc
      d: "mm" //default
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar: avatar,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
// user matched

const payload = {id:user.id,name:user.name,avatar:user.avatar} //create jwt payload

// sign Token

jwt.sign(payload,secretKey,{expiresIn:3600},(err,token)=>{
    res.json({
        success:true,
        token:`Bangya token ${token}`
    })
})
    }
      return res.status(400).json({ password: "Password incorrect" });
    });
  });
});

module.exports = router;