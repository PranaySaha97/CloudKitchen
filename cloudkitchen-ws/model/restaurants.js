var connection = require('../utilities/connection');
const argon2 = require('argon2');
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

restaurantModel.testFunctionFood=()=>{
    return connection.getFoodCollection().then((data) => {
        return data.find().then(foods => {
            if (foods.length > 0) {
                return foods
            }
            else return false
        })
    })
}

restaurantModel.generateRestaurantId = () => {
    return connection.getRestaurantCollection().then((collection) => {
        return collection.distinct('restaurantId').then((ids) => {
            let rIds = []
            console.log(ids)
            for (let id of ids) {
                rIds.push(Number(id.slice(1,)))
            }
            let rId = Math.max(...rIds)
            return rId + 1;
        })
    })
}

restaurantModel.generaterestaurantId = () => {
    return connection.getFoodCollection().then((collection) => {
        return collection.distinct('restaurantId').then((ids) => {
            let fIds = []
            console.log(ids)
            for (let id of ids) {
                fIds.push(Number(id.slice(1,)))
            }
            let fId = Math.max(...fIds)
            return fId + 1;
        })
    })
}


// to register delivery person and add to database
restaurantModel.register = (restaurantObj) => {
    
    return connection.getRestaurantCollection().then((collection) => {
        return restaurantModel.generateRestaurantId().then((id) => {
            restaurantObj.restaurantId = 'R' + id;
            return collection.create(restaurantObj).then((data) => {
                if (data) return true;
                else return false;
            })
        })
    })
}

restaurantModel.login=(restaurantObj)=>{
    
    return connection.getRestaurantCollection().then((collection) => {
        return collection.findOne({ restaurantMobile: restaurantObj.restaurantMobile }).then((data) => {
            return argon2.verify(data.restaurantPassword, restaurantObj.restaurantPassword).then((correct) => {
                if (correct) {
                    return data;
                } else return false;
            })
        })
    })
}

restaurantModel.updateRestaurantProfile=(restaurantId,restaurantObj)=>{
  
    return connection.getRestaurantCollection().then((collection) => { 
        return collection.updateOne({restaurantId:restaurantId},{$set:restaurantObj}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}

restaurantModel.addMenu=(restaurantObj)=>{
    
    return connection.getFoodCollection().then((collection) => { 
        return restaurantModel.generaterestaurantId().then((id) => {
            restaurantObj.restaurantId = 'F' + id;
            return collection.create(restaurantObj).then((data) => {

                if (data) return true;
                else return false;
            })
    })
})
}

restaurantModel.deleteMenu=(restaurantId,foodId)=>{
    return connection.getFoodCollection().then((collection) => { 
        return collection.remove({restaurantId:restaurantId,foodId:foodId}).then((data) => {

            if (data) return true;
            else return false;
        })
})
}

restaurantModel.updateMenu=(restaurantId,restaurantObj)=>{
    
    return connection.getFoodCollection().then((collection) => { 
        return collection.updateOne({restaurantId:restaurantId},{$set:restaurantObj}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}

restaurantModel.addAmbience=(restaurantId,restaurantAmbience)=>{
    
    return connection.getRestaurantCollection().then((collection) => { 
    return collection.updateOne({restaurantId:restaurantId},{$push:{restaurantAmbience:restaurantAmbience}}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}
restaurantModel.deleteAmbience=(restaurantId,restaurantAmbience)=>{
    
    return connection.getRestaurantCollection().then((collection) => { 
    return collection.updateOne({restaurantId:restaurantId},{$pull:{restaurantAmbience:{$in:restaurantAmbience}}}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}

restaurantModel.getOrders=(restaurantId)=>{
 
    return connection.getOrdersCollection().then((collection) => { 
       
        return collection.find({restaurantId:restaurantId}).then(res=>{
            console.log(res)
            if(res.length>0) return res
            else return false
        })
    })
}

restaurantModel.changeOrderState=(orderId,status)=>{
    console.log("Model is ok")
    return connection.getOrdersCollection().then((collection) => {
        return collection.updateOne({orderId:orderId},{$set:{state:status}}).then(res=>{
            console.log(res)
            if(res.length>0) return res
            else return false
        })
    })
    
}
module.exports = restaurantModel;