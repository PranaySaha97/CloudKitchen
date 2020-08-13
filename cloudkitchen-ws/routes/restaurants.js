var express = require('express');
var router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

var restaurantService = require('../service/restaurants');
const restaurantModel = require('../model/restaurants');
// route to check if restaurant data is available
router.get('/', function (req, res, next) {
    restaurantService.testFunction().then((data) => {
        if (data) {
            res.send('welcome to restaurant route');
        } else {
            let err = new Error('No records found');
            err.status = 404;
            throw err; // throws error if no data for restaurant is found
        }
    }).catch(err => next(err))
});
router.post('/register',async(req,res,next)=>{
    
    let restrauntObj = req.body
    console.log(restrauntObj)
  
  //agron2 encryption to encrypt and store the password
  restrauntObj.restaurantPassword = await argon2.hash(req.body.restaurantPassword, { type: argon2.argon2id })
  console.log(restrauntObj.restaurantPassword)
  restaurantService.register(restrauntObj).then(data => {
    if (data) {
      res.send(data);
    } else {
      let err = new Error('registration failed!');
      err.status = 500; // internal server error
      throw err;
    }
  }).catch(err => next(err))
  }
)

module.exports = router;