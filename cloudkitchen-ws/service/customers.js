var customerModel = require('../model/customers');

const customerService = {};

// service to connect to customer db model
customerService.testFunction = () => {
    return customerModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}

module.exports = customerService;