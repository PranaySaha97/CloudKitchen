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
    
    let foodObj = req.body
    
  
  //agron2 encryption to encrypt and store the password
  foodObj.restaurantPassword = await argon2.hash(req.body.restaurantPassword, { type: argon2.argon2id })
 //to register restaurant
  restaurantService.register(foodObj).then(data => {
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
    
    let foodObj = req.body
    return restaurantService.login(foodObj).then(data=>{
      if(data){
        res.send(data);
      
      }else{
        let err=new Error('Credential Missmatched!');
        err.status=500;
        throw err;
      }
    }).catch(err=>next(err))
  })

  //to update restaurant profile
router.put("/updateRestaurantProfile/:restaurantId",async(req,res,next)=>{
  
  let foodObj=req.body;
  let restaurantId=req.params.restaurantId
  
  return restaurantService.updateRestaurantProfile(restaurantId,foodObj).then(data=>{
    if(data.nModified){
      res.send("Restaurant Profile with Id: "+restaurantId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to update data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})
  
  //to add food items
router.post("/addFood",async(req,res,next)=>{
  
  let foodObj=req.body
  return restaurantService.addMenu(foodObj).then(data=>{
    if(data){
      res.send(data);

    }else{
      let err=new Error("Item Not added in Menu, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})

//to update food items
router.put("/updateFood/:restaurantId",async(req,res,next)=>{
  
  let foodObj=req.body;
  let restaurantId=req.params.restaurantId
  
  return restaurantService.updateMenu(restaurantId,foodObj).then(data=>{
    if(data.nModified){
      res.send("Food Item with Id:"+restaurantId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to update data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})

//delete food Item
router.delete("/deleteFood/:restaurantId/:foodId",async(req,res,next)=>{
  let restaurantId=req.params.restaurantId
  let foodId=req.params.foodId
  console.log(restaurantId+foodId)
  return restaurantService.deleteMenu(restaurantId,foodId).then(data=>{
    if(data){
      res.send("Food Item with Id:"+foodId+" is deleted.")
    }else{
      let err=new Error("Sorry! Unable to delete data, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})
//update ambience
router.put("/addAmbience/:restaurantId",async(req,res,next)=>{
  let restaurantId=req.params.restaurantId
  let restaurantAmbience=req.body.restaurantAmbience
  return restaurantService.addAmbience(restaurantId,restaurantAmbience).then(data=>{
    if(data.nModified){
      res.send("Ambience Images of Restaurant Id:"+restaurantId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to update pictures, Try again!")
      err.status=500;
      throw err;
    }
  }).catch(err=>next(err))
})

router.put("/deleteAmbience/:restaurantId",async(req,res,next)=>{
  let restaurantId=req.params.restaurantId
  let restaurantAmbience=req.body.restaurantAmbience
  console.log(restaurantAmbience)
  return restaurantService.deleteAmbience(restaurantId,restaurantAmbience).then(data=>{
   
    if(data.nModified>0){
      res.send("Ambience Images of Restaurant Id:"+restaurantId+" is updated.")
    }else{
      let err=new Error("Sorry! Unable to delete pictures, Try again!")
      err.status=404;
      throw err;
    }
  }).catch(err=>next(err))
})
//get orders from customer using restaurantId
router.get("/getOrders/:restaurantId",async(req,res,next)=>{
  let restaurantId=req.params.restaurantId
  return restaurantService.getOrders(restaurantId).then((data)=>{
    if(data){
      res.send(data)
    }else{
      let err=new Error("Sorry! Unable to fetch orders, Try again!")
      err.status=404;
      throw err;
    }
    
  }).catch(err=>next(err))
})
//to change the order status
router.put("/changeOrderState/:orderId/:status",async(req,res,next)=>{
   let orderId=req.params.orderId
   let status=req.params.status
   return restaurantService.changeOrderState(orderId,status).then((data)=>{
    if(data){
      res.send(data)
    }else{
      let err=new Error("Sorry! Unable to Change Status, Try again!")
      err.status=500;
      throw err;
    }
    
  }).catch(err=>next(err))
})


module.exports = router;