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

module.exports = restaurantModel;