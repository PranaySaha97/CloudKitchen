var express = require('express');
var router = express.Router();

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

module.exports = router;