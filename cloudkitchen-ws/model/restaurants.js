var connection = require('../utilities/connection');

const restaurantModel = {}

restaurantModel.testFunction = () => {
    return connection.getRestautrantCollection().then((data) => {
        return data.find().then(restaurants => {
            console.log(restaurants)
            if (restaurants.length > 0) {
                return restaurants
            }
            else return false
        })
    })
}

module.exports = restaurantModel;