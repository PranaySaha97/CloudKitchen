var connection = require('../utilities/connection');

const deliveryPersonModel = {}

// checks if any data for delivery-person is available in db
deliveryPersonModel.testFunction = () => {
    return connection.getDeliveryPersonCollection().then((data) => {
        return data.find().then(deliveryPersons => {
            if (deliveryPersons.length > 0) {
                return deliveryPersons
            }
            else return false
        })
    })
}

module.exports = deliveryPersonModel;