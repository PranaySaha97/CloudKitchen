var express = require('express');
var router = express.Router();

var restaurantService = require('../service/restaurants');

router.get('/', function (req, res, next) {
    restaurantService.testFunction().then((data) => {
        if (data) {
            res.send('welcome to restaurant route');
        } else {
            let err = new Error('No records found');
            err.status = 404;
            throw err;
        }
    }).catch(err => next(err))
});

module.exports = router;