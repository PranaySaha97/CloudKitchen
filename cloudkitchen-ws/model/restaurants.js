var connection = require('../utilities/connection');

const restaurantModel = {}

// checks if any data for restaurants is available in db
restaurantModel.testFunction = () => {
    return connection.getRestautrantCollection().then((data) => {
        return data.find().then(restaurants => {
            if (restaurants.length > 0) {
                return restaurants
            }
            else return false
        })
    })
}
restaurantModel.generateId = () => {
    return connection.getRestautrantCollection().then((collection) => {
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
restaurantModel.registerFunction = () => {
    return connection.getRestautrantCollection().then((data) => {
        return data.find().then(resturants => {
            if (resturants.length > 0) {
                return "Restaurant already exists!"
            }
            else {
                return connection.getDeliveryPersonCollection().then((collection) => {
                    return restaurantModel.generateId().then((id) => {
                        restaurantObj.restaurantId = 'R' + id;
                        return collection.create(restaurantObj).then((data) => {
                            if (data) return "Registered Successfully";
                            else return false;
                        })
                    })
                })

            }
        })
    })
}
module.exports = restaurantModel;