var express = require('express');
var router = express.Router();
var adminService = require('../service/admin');
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


router.get('/order', passport.authenticate('admin', {session: false}), (req, res, next)=>{
    return adminService.getOrders().then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
})

router.get('/restaurant', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  return adminService.getRest().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/customer', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  return adminService.getCust().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/delper', passport.authenticate('admin', {session: false}), (req, res, next)=>{
  return adminService.getDelPer().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})
    
module.exports = router;