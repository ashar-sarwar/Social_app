const express = require('express');
const router = express.Router()

router.get("/test",()=>console.log("posts here"))

module.exports = router