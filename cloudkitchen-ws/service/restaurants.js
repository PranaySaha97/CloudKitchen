var restaurantModel = require('../model/restaurants');

const restaurantService = {};

// service to connect to restaurant db model
restaurantService.testFunction = () => {
    return restaurantModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}


restaurantService.testFunctionFood=()=>{
    return restaurantModel.testFunctionFood().then((data)=>{
       if(data){
           return true;
       }else{
           return false;
       }
    })
}

// service for restaurant registration
restaurantService.register = (restaurantObj) => {
    console.log("service is good")
    return restaurantModel.register(restaurantObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.login=(restaurantObj)=>{
    
    return restaurantModel.login(restaurantObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.updateRestaurantProfile=(restaurantId,restaurantObj)=>{
    console.log("service is good")
    return restaurantModel.updateRestaurantProfile(restaurantId,restaurantObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.addMenu=(foodObj)=>{
    
    return restaurantModel.addMenu(foodObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.updateMenu=(foodId,foodObj)=>{
    console.log("service is good")
    return restaurantModel.updateMenu(foodId,foodObj).then(data => {
        if (data) return data;
        else return false;
    })
}
module.exports = restaurantService;