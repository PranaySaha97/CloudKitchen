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
   
    return restaurantModel.updateMenu(foodId,foodObj).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.deleteMenu=(restaurantId,foodId)=>{
   
    return restaurantModel.deleteMenu(restaurantId,foodId).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.addAmbience=(restaurantId,restaurantAmbience)=>{
    
    return restaurantModel.addAmbience(restaurantId,restaurantAmbience).then(data => {
        if (data) return data;
        else return false;
    })
}


restaurantService.deleteAmbience=(restaurantId,restaurantAmbience)=>{
    
    return restaurantModel.deleteAmbience(restaurantId,restaurantAmbience).then(data => {
        if (data) return data;
        else return false;
    })
}

restaurantService.getOrders=(restaurantId)=>{

    return restaurantModel.getOrders(restaurantId).then(data=>{
        if (data) return data;
        else return false; 
    })

}

restaurantService.changeOrderState=(orderId,status)=>{

    return restaurantModel.changeOrderState(orderId,status).then(data=>{
    if (data) return data;
    else return false; 
})
}
module.exports = restaurantService;