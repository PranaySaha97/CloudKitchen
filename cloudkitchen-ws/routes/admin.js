var express = require('express');
var router = express.Router();
var adminService = require('../service/admin');

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

router.get('/order', (req, res, next)=>{
    return adminService.getOrders().then((data)=>{
      res.json(data)
    }).catch(err=>next(err))
})

router.get('/restaurant', (req, res, next)=>{
  return adminService.getRest().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/customer', (req, res, next)=>{
  return adminService.getCust().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})

router.get('/delper', (req, res, next)=>{
  return adminService.getDelPer().then((data)=>{
    res.json(data)
  }).catch(err=>next(err))
})
    
    module.exports = router;