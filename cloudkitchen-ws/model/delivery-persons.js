var connection = require('../utilities/connection');
const argon2 = require('argon2'); // for password decryption

const deliveryPersonModel = {}

// to generate Id for delivery person
deliveryPersonModel.generateId = () => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return collection.distinct('deliveryPersonId').then((ids) => {
            let dpIds = []
            for (let id of ids) {
                dpIds.push(Number(id.slice(1,)))
            }
            let dpId = Math.max(...dpIds)
            return dpId + 1;
        })
    })
}

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

// to register delivery person and add to database
deliveryPersonModel.register = (deliveryPersonObj) => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return deliveryPersonModel.generateId().then((id) => {
            deliveryPersonObj.deliveryPersonId = 'D' + id;
            return collection.create(deliveryPersonObj).then((data) => {
                if (data) return true;
                else return false;
            })
        })
    })
}

// to check credentials for delivery person and authorize login
deliveryPersonModel.login = (credentials) => {
    return connection.getDeliveryPersonCollection().then((collection) => {
        return collection.findOne({ mobileNum: credentials.mobileNum }).then((data) => {
            // argon2 decryption to verify the password
            return argon2.verify(data.password, credentials.password).then((correct) => {
                if (correct) {
                    return data;
                } else return false;
            })
        })
    })
}

// to fetch all orders for a delivery person
deliveryPersonModel.getAllOrders = () => {
    return connection.getOrdersCollection().then((collection) => {
        return collection.find({ state: 'pending' }, { _id: 0 }).then((data) => {
            if (data.length > 0) return data
            else if (data.length === 0) {
                let err = new Error('No orders as of now')
                err.status = 404;
                throw err;
            }
            else return false
        })
    })
}


// to pick an order for a delivery person
deliveryPersonModel.pickOrder = (deliveryPersonId, orderId) => {
    return connection.getOrdersCollection().then((collection) => {
        return collection.updateOne({ orderId: orderId },
            { $set: { deliveryPerson: deliveryPersonId, state: 'alloted-delivery' } }).then(data => {
                if (data) return `Order with orderID ${orderId} alloted for ${deliveryPersonId}`;
                else return false
            })
    })

}

module.exports = deliveryPersonModel;