var deliveryPersonModel = require('../model/delivery-persons');

const deliveryPersonService = {};

// service to connect to delivery-person db model
deliveryPersonService.testFunction = () => {
    return deliveryPersonModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}

// service for delivery persons registration
deliveryPersonService.register = (deliveryPersonObj) => {
    return deliveryPersonModel.register(deliveryPersonObj).then(data => {
        if (data) return true;
        else return false;
    })
}

// service for delivery persons login
deliveryPersonService.login = (credentials) => {
    return deliveryPersonModel.login(credentials).then(data => {
        if (data) return data;
        else return false;
    })
}

module.exports = deliveryPersonService;