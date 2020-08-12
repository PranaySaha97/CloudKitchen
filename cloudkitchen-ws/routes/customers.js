var express = require('express');
var router = express.Router();
const multer = require('multer');
var customerService = require('../service/customers');
const imageHandler = require('../utilities/custImageHandler');
const { memoryStorage } = require('multer');
const path = require('path');
const passport = require('passport');
const custSchema =require("../model/custObj")

let upload= multer({ // creating upload middleware
  storage: memoryStorage(), 
  fileFilter: (req, file, cb) =>{
      //  limiting file types using extensions
      if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
          cb(null, true)
      }else{
          let err= new Error('Invalid file type.')
          err.status= 400
          cb(err , false)
      }
  }
})
  


// route to check if customer data is available
router.get('/', function (req, res, next) {
  customerService.testFunction().then((data) => {
    if (data) {
      res.send('welcome to customer route');
    } else {
      let err = new Error('No records found');
      err.status = 404;
      throw err; // throws error if no data for customer is found
    }
  }).catch(err => next(err))
});

// using upload middleware to store file in server
router.post('/register', upload.single('profilePic') , async (req, res, next)=>{
  let new_customer = new custSchema(req.body)
  if (req.file){
    // new_customer.profilePic= req.file.originalname
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    new_customer.profilePic= filename;
    await imageHandler(req).catch((err)=>next(err))
  }
  return customerService.register_user(new_customer).then((user)=>{
      res.json(user)
  }).catch(err=> next(err))
})


router.post('/login', (req, res, next)=>{
let contact = req.body.contact
let password = req.body.pass
return customerService.login_user(contact, password).then((data)=>{
  res.json(data)
}).catch(err=>next(err))
})

router.get('/getProfileImage/', passport.authenticate('jwt', {session: false}) ,(req, res, next)=>{
   let imageName = req.user.profilePic;
   res.sendFile(path.join(__dirname+'/../'+'uploads/'+'images/'+'customer/'+imageName))
});

module.exports = router;
