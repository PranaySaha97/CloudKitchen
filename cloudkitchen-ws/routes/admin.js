var express = require('express');
var router = express.Router();
var adminService = require('../service/admin');
var admin=require('../model/admin');
const passport = require('passport');

router.get('/', (req, res, next)=>{
    return adminService.setupAdmin("Admin@123").then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
    })

router.post('/login', (req, res, next)=>{
    let contact = req.body.contact
    let password = req.body.pass
    return adminService.login_admin(contact, password).then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
    })

router.get('/authCheck', passport.authenticate('jwt', {session: false}), (req,res,next)=>{
  res.send('hello admin')
})
    
module.exports = router;