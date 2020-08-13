var express = require('express');
var router = express.Router();
const argon2 = require('argon2'); // for password encryption
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer')
const imageHandler = require('../utilities/ImageHandler');

//for image handling
let storage = multer.memoryStorage();
let upload = multer({ storage })

var deliveryPersonService = require('../service/delivery-persons');
const deliveryPersonModel = require('../model/delivery-persons');

// route to check if delivery-person data is available
router.get('/', function (req, res, next) {
  deliveryPersonService.testFunction().then((data) => {
    if (data) {
      res.send('welcome to delivery person route');
    } else {
      let err = new Error('No records found');
      err.status = 404;
      throw err; // throws error if no data for delivery-person is found
    }
  }).catch(err => next(err))
});

// for delivery person to register
router.post('/register', upload.single('deliveryPersonImage'), async (req, res, next) => {
  let deliveryPersonObj = req.body
  // agron2 encryption to encrypt and store the password
  deliveryPersonObj.password = await argon2.hash(req.body.password, { type: argon2.argon2id })
  if (req.file) {
    // new_customer.profilePic= req.file.originalname
    let filename = new Date().toDateString() + '-' + req.file.originalname;
    filename = filename.split(' ').join('-');
    deliveryPersonObj.deliveryPersonImage = filename;
    await imageHandler(req, 'delivery-person/').catch((err) => next(err))
  }
  deliveryPersonService.register(deliveryPersonObj).then(data => {
    if (data) {
      res.send('registerd successfully!');
    } else {
      let err = new Error('registration failed!');
      err.status = 500; // internal server error
      throw err;
    }
  }).catch(err => next(err))
})

// for delivery person to login
router.post('/login', (req, res, next) => {
  let credentials = req.body;
  deliveryPersonService.login(credentials).then(data => {
    if (data) {
      jwt.sign({ data }, 'deliveryPersonDetails', (err, token) => {
        res.json({
          token,
          message: `Welcome, ${data}!`
        })
      })
    }
    else {
      let err = new Error('Invalid Credentials');
      err.status = 403; // forbidden error
      throw err;
    }
  }).catch(err => next(err))
})

router.get('/getProfileImage', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'deliveryPersonDetails', (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      console.log(authData)
      let imageName = authData.data.deliveryPersonImage;
      res.sendFile(path.join(__dirname + '/../' + 'uploads/' + 'images/' + 'delivery-person/' + imageName))
    }
  })
})


// to verify jwt token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader != 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }

}
module.exports = router;