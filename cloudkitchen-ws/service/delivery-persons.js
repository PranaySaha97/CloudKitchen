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

module.exports = deliveryPersonService;