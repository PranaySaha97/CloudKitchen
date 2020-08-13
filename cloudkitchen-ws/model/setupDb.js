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
        "restaurantPassword": "Harshita",
        "restaurantName": "curry leaves in dal-fry",
        "restaurantAddress": "No. 420, spices street, chennai",
        "restaurantEmail": "curry123",
        "restaurantAbout": "Delicious cuisine of North India with curry leaves tinch as it is good for health",
        "restaurantPincode": 600078,
        "restaurantMobile": 9876543210,
        "restaurantPhoto": "sampleImage.jpg",
        "restaurantRating": 0
    }
]

const deliveryPersonData = [
    {
        "deliveryPersonId": "D1001",
        "name": "John",
        "email": "john@gmail.com",
        "password": "pass123",
        "mobileNum": "9876543211",
        "deliveryPersonImage": "sampleImg.jpg",
        "deliveryPersonRating": 0,
    }
]


const foodData=[
    {
        "foodId":"F1001",
        "restaurantId":"R1001",
        "img":"start.jpg",
        "name":"Pasta",
        "description":"italian veg pasta with white sauce",
        "category":"main-course",// starter/main-course/dessert/juice
        "type":"italian",// north-indian/south-india/etc..
        "veg":true,
        "price":250,
        "discount":5,
        "available":true
    }
]

exports.setupDb = () => {
    return connection.getCustomerCollection().then((user) => {
        return user.deleteMany().then(() => {
            return user.insertMany(customerData).then(() => {
                return connection.getRestautrantCollection().then((restaurant) => {
                    return restaurant.deleteMany().then(() => {
                        return restaurant.insertMany(restaurantData).then(() => {
                            return connection.getDeliveryPersonCollection().then((deliveryPerson) => {
                                return deliveryPerson.deleteMany().then(() => {
                                    return deliveryPerson.insertMany(deliveryPersonData).then(() => {
                                        return connection.getFoodCollection().then((food) => {
                                            return food.deleteMany().then(() => {
                                                return food.insertMany(foodData).then((data) => {
                                                    if (data) return "Insertion successful!"
                                                    else {
                                                        let err = new Error('Insertion failed!');
                                                        err.status = 500;
                                                        throw err;
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}