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

//to test food db
router.get('/testfoodDB', function (req, res, next) {
  restaurantService.testFunctionFood().then((data) => {
      if (data) {
          res.send('welcome to food route');
      } else {
          let err = new Error('No records found');
          err.status = 404;
          throw err; // throws error if no data for restaurant is found
      }
  }).catch(err => next(err))
});
router.post('/register',async(req,res,next)=>{
    
    let restaurantObj = req.body
    
  
  //agron2 encryption to encrypt and store the password
  restaurantObj.restaurantPassword = await argon2.hash(req.body.restaurantPassword, { type: argon2.argon2id })
 
  restaurantService.register(restaurantObj).then(data => {
    if (data) {
      res.send(data);
    } else {
      let err = new Error('registration failed!');
      err.status = 500; // internal server error
      throw err;
    }
  }).catch(err => next(err))
  });

  //login of restaurants
  router.post("/login",async(req,res,next)=>{
    console.log("aur app jeetgye hai 5 crore ")
    let restaurantObj = req.body
    return restaurantService.login(restaurantObj).then(data=>{
      if(data){
        res.send(data);
      
      }else{
        let err=new Error('Credential Missmatched!');
        err.status=500;
        throw err;
      }
    })
  })
  
  //to add food items
router.post("/addFood",async(req,res,next)=>{
  console.log("aur app jeetgye hai 5 crore ")
  let foodObj=req.body
  return restaurantService.addMenu(foodObj).then(data=>{
    if(data){
      res.send(data);

    }else{
      let err=new Error("Item Not added in Menu, Try again!")
      err.status=500;
      throw err;
    }
  })
})

//to update food items
router.put("/updateFood")

module.exports = router;