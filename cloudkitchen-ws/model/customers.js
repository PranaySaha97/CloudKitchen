var connection = require('../utilities/connection');

const customerModel = {}

customerModel.testFunction = () => {
    return connection.getCustomerCollection().then((data) => {
        return data.find().then(customers => {
            if (customers) {
                return customers
            }
            else return false
        })
    })
}

module.exports = customerModel;