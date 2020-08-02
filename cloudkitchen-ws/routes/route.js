const express=require('express')
const router=express.Router()
const cors=require("cors")
const create = require('../model/setupDb');

router.get('/setupDb',(req,res,next)=>{
    create.setupDb().then((data)=>{
        res.send(data);
    }).catch(err=>{
        next(err);
    })
})

module.exports = router