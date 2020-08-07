const connection = require('../utilities/connection');

const customerData = [
    {
        "customerId": "C1001",
        "userName": "Shaz97",
        "password": "admin123",
        "name": "Shatakshi Srivastava",
        "email": "admin@gmail.com",
        "profilePic": "xyz",
        "mobileNum": 9599790218,
        "address": "2/672",
        "pincode": "17272",
    },
]

const restaurantData = [
    {
        "restaurantId": "R1001",
        "restaurantName": "curry leaves in dal-fry",
        "restaurantAddress": "No. 420, spices street, chennai",
        "restaurantPincode": 600078,
        "restaurantMobile": 9876543210,
        "restaurantPhoto": "sampleImage.jpg",
        "restaurantRating": 0,
    }
]

exports.setupDb = () => {
    return connection.getCustomerCollection().then((user) => {
        return user.deleteMany().then(() => {
            return user.insertMany(customerData).then(() => {
                return connection.getRestautrantCollection().then((restaurant) => {
                    return restaurant.deleteMany().then(() => {
                        return restaurant.insertMany(restaurantData).then((data) => {
                            if (data) {
                                return "Insertion successful!";
                            } else {
                                let err = new Error('Insertion Failed!');
                                err.status = 500;
                                throw err;
                            }
                        })
                    })
                })
            })
        })
    })
}