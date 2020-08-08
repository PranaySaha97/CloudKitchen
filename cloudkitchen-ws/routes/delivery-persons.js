var express = require('express');
var router = express.Router();
const argon2 = require('argon2'); // for password encryption
const jwt = require('jsonwebtoken');

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
router.post('/register', async (req, res, next) => {
  let deliveryPersonObj = req.body
  // agron2 encryption to encrypt and store the password
  deliveryPersonObj.password = await argon2.hash(req.body.password, { type: argon2.argon2id })
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
          message: `Welcome, ${data.name}!`
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

module.exports = router;