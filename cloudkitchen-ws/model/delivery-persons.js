var connection = require('../utilities/connection');

const deliveryPersonModel = {}

deliveryPersonModel.testFunction = () => {
    return connection.getDeliveryPersonCollection().then((data) => {
        return data.find().then(deliveryPersons => {
            console.log(deliveryPersons)
            if (deliveryPersons.length > 0) {
                return deliveryPersons
            }
            else return false
        })
    })
}

module.exports = deliveryPersonModel;