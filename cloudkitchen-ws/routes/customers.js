var express = require('express');
var router = express.Router();

var customerService = require('../service/customers');

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

module.exports = router;
