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
      res.json({
        'message': 'registerd successfully!'
      });
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
      jwt.sign({ data }, 'deliveryPersonDetails-' + data.deliveryPersonId, (err, token) => {
        res.json({
          token,
          userData: {
            name: data.name,
            deliveryPersonId: data.deliveryPersonId,
            mobileNum: data.mobileNum
          }
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

// to get delivery-person's profile picture
router.get('/getProfileImage/:dpId', verifyToken, (req, res, next) => {
  let { dpId } = req.params
  jwt.verify(req.token, 'deliveryPersonDetails-' + dpId, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      let imageName = authData.data.deliveryPersonImage;
      res.sendFile(path.join(__dirname + '/../' + 'uploads/' + 'images/' + 'delivery-person/' + imageName))

    }
  })
})

// to get all orders placed
router.get('/getAllOrders/:dpId', verifyToken, (req, res, next) => {
  let { dpId } = req.params
  jwt.verify(req.token, 'deliveryPersonDetails-' + dpId, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      deliveryPersonService.getAllOrders().then((data) => {
        if (data) res.json(data);
        else {
          let err = new Error('Unable to fetch orders');
          err.status = 500;
          throw err;
        }
      }).catch(err => next(err));
    }
  })
})

// route to pick an order for a delivery person
router.put('/pickOrder/:dpId/:oId', verifyToken, (req, res, next) => {
  let { dpId, oId } = req.params
  jwt.verify(req.token, 'deliveryPersonDetails-' + dpId, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      deliveryPersonService.pickOrder(dpId, oId).then(data => {
        if (data) res.json({
          'message': data
        })
        else {
          let err = new Error('Unable to pick this order at this moment')
          err.status = 500;
          throw err;
        }
      }).catch(err => next(err))
    }
  })
})

// route to get all penalties
router.get('/getAllPenalties/:dpId', verifyToken, (req, res, next) => {
  let { dpId } = req.params
  jwt.verify(req.token, 'deliveryPersonDetails-' + dpId, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      deliveryPersonService.getAllPenalties(dpId).then(data => {
        if (data) res.json(data)
        else {
          let err = new Error('Could not fetch penalities.');
          err.status = 500;
          throw err
        }
      }).catch(err => next(err))
    }
  })
})

// to pay a penalty
router.put('/payPenalty/:dpId/:penaltyId', verifyToken, (req, res, next) => {
  let { dpId, penaltyId } = req.params
  jwt.verify(req.token, 'deliveryPersonDetails-' + dpId, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      deliveryPersonService.payPenalty(dpId, penaltyId).then(data => {
        if (data) {
          res.json({
            'message': data
          })
        } else {
          let err = new Error('Could not fetch penalities.');
          err.status = 500;
          throw err
        }
      })
    }
  })
})

router.put('/updateDetails/:dpId', verifyToken, upload.single('deliveryPersonImage'), (req, res, next) => {
  let { dpId } = req.params;
  jwt.verify(req.token, 'deliveryPersonDetails-' + dpId, async (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      let newDetails = {}
      if (req.file) {
        let filename = new Date().toDateString() + '-' + req.file.originalname;
        filename = filename.split(' ').join('-');
        newDetails.deliveryPersonImage = filename;
        authData.data.deliveryPersonImage = newDetails.deliveryPersonImage;
        await imageHandler(req, 'delivery-person/').catch((err) => next(err))
      }
      typeof req.body.name !== 'undefined' ? newDetails.name = req.body.name : null;
      typeof req.body.email !== 'undefined' ? newDetails.email = req.body.email : null;
      typeof req.body.mobileNum !== 'undefined' ? newDetails.mobileNum = req.body.mobileNum : null;
      deliveryPersonService.updateDetails(dpId, newDetails).then(data => {
        if (data) {
          jwt.sign({ data }, 'deliveryPersonDetails-' + data.deliveryPersonId, (err, token) => {
            res.json({
              token,
              message: `updated successfully for ${data.deliveryPersonId}`
            })
          })
        } else {
          let err = new Error('Failed to update details');
          err.status = 500;
          throw err;
        }
      }).catch(err => next(err))

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