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

// service for restaurant registration
restaurantService.register = (restaurantObj) => {
    console.log("service is good")
    return restaurantModel.register(restaurantObj).then(data => {
        if (data) return data;
        else return false;
    })
}

module.exports = restaurantService;