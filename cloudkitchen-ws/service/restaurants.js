var restaurantModel = require('../model/restaurants');

const restaurantService = {};

// service to connect to restaurant db model
restaurantService.testFunction = () => {
    return restaurantModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}

module.exports = restaurantService;