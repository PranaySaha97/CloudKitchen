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

restaurantModel.generateFoodId = () => {
    return connection.getFoodCollection().then((collection) => {
        return collection.distinct('foodId').then((ids) => {
            let fIds = []
            console.log(ids)
            if(ids==null){
                return 1001
            }
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

restaurantModel.login=(contact)=>{
   
    return connection.getRestaurantCollection().then((collection) => {
      return collection.findOne({ restaurantMobile: contact }).then((data) => {
        if(data){
               return data
           }else return false
        })
    })
}

restaurantModel.viewRestaurantProfile=(restId) => {
    return connection.getRestaurantCollection().then((data)=> {
        return data.find({_id: restId}).then((data_list) => {
            if (data_list){
                console.log(data_list)
                return data_list
            }else{
                return null
            }
        })
    })
}

restaurantModel.updateRestaurantProfile=(restaurantId,restaurantObj)=>{
  
    return connection.getRestaurantCollection().then((collection) => { 
        return collection.updateOne({_id:restaurantId},{$set:restaurantObj}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}

restaurantModel.addMenu=(foodObj)=>{
    
    
    return connection.getFoodCollection().then((collection) => { 
        return restaurantModel.generateFoodId().then((id) => {
            foodObj.foodId = 'F' + id;
            return collection.create(foodObj).then((data) => {
                
                if (data) {
                    let obj={}
                    let menu={}
                    menu["menu."+data.category]=data.foodId
                    console.log(menu[data.category])
                    obj.menu=menu
                    console.log(obj.menu)
                    return connection.getRestaurantCollection().then((collection) => {
                        return collection.updateOne({restaurantId:data.restaurantId},
                            {$push:obj.menu}).then(res=>{
                            if(res.nModified>0) return res
                            else return false
                        })
                        
                    })
               
            }else return false
               
        }) 
    })
})
}

restaurantModel.deleteMenu=(restaurantId,foodId,category)=>{

    return connection.getFoodCollection().then((collection) => { 
        return collection.remove({restaurantId:restaurantId,foodId:foodId}).then((data) => {
           if(data.deletedCount>0){
                let obj ={}
                obj["menu.".concat(category)] = foodId
                return connection.getRestaurantCollection().then((collection) => {
                    return collection.updateOne({restaurantId:restaurantId}, {$pull: obj}).then(res=>{
                        if(res.nModified>0) return res
                        else return false
                    })
                    
                })
           }else return false
               
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
    return collection.updateOne({_id:restaurantId},{$push:{restaurantAmbience:restaurantAmbience}}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}
restaurantModel.deleteAmbience=(restaurantId,restaurantAmbience)=>{
    
    return connection.getRestaurantCollection().then((collection) => { 
    return collection.updateOne({_id:restaurantId},{$pull:{restaurantAmbience:{$in:restaurantAmbience}}}).then(res=>{
            if(res.nModified>0) return res
            else return false
        })
    })
}

restaurantModel.getOrders=(restaurantId)=>{
 
    return connection.getOrdersCollection().then((collection) => { 
       
        return collection.find({_id:restaurantId}).then(res=>{
            console.log(res)
            if(res.length>0) return res
            else return false
        })
    })
}

restaurantModel.changeOrderState=(orderId,status)=>{
    
    return connection.getOrdersCollection().then((collection) => {
        return collection.updateOne({orderId:orderId},{$set:{state:status}}).then(res=>{
            console.log(res)
            if(res.length>0) return res
            else return false
        })
    })
    
}
module.exports = restaurantModel;