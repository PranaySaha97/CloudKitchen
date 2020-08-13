var connection = require('../utilities/connection');

const restaurantModel = {}

// checks if any data for restaurants is available in db
restaurantModel.testFunction = () => {
    return connection.getRestaurantCollection().then((data) => {
        return data.find().then(restaurants => {
            if (restaurants.length > 0) {
                return restaurants
            }
            else return false
        })
    })
}
restaurantModel.generateId = () => {
    return connection.getRestaurantCollection().then((collection) => {
        return collection.distinct('restaurantId').then((ids) => {
            let rIds = []
            for (let id of ids) {
                rIds.push(Number(id.slice(1,)))
            }
            let rId = Math.max(...rIds)
            return rId + 1;
        })
    })
}
restaurantModel.testFunction = () => {
    return connection.getRestaurantCollection().then((data) => {
        return data.find().then(restaurants => {
            if (restaurants.length > 0) {
                return restaurants
            }
            else return false
        })
    })
}

// to register delivery person and add to database
restaurantModel.register = (restaurantObj) => {
    console.log("i am model")
    return connection.getRestaurantCollection().then((collection) => {
        return restaurantModel.generateId().then((id) => {
            restaurantObj.deliveryPersonId = 'D' + id;
            return collection.create(restaurantObj).then((data) => {
                if (data) return true;
                else return false;
            })
        })
    })
}
module.exports = restaurantModel;