var connection = require('../utilities/connection');



const adminModel = {}


adminModel.setupAdmin = (pass) => {
return connection.getAdminCollection().then((user) => {
    return user.deleteMany().then(() => {        
        return user.insertMany( adminData = [
            {
                "mobileNum":"9599790218",
                "password":pass
            }
        ]).then((result) => {
            if ( result ){
                return true
            }
                else return false 
        })
    })
})
}
adminModel.login_admin = (contact) => {
    return connection.getAdminCollection().then(admins=>{
        return admins.findOne({'mobileNum': contact}).then((admin)=>{
            if(admin){
                return admin
            }else{
                return null
            }
        })
    })
}

adminModel.getOrders=()=>{
    return connection.getRestautrantCollection().then((data)=>{
        return data.find().then((order)=>{
            if(order){
                return order
            }else{
                return null
            }
        })
    })
}

adminModel.getRest=()=>{
    return connection.getRestautrantCollection().then((data)=>{
        return data.find().then((rest)=>{
            if(rest){
                return rest
            }else{
                return null
            }
        })
    })
}

adminModel.getDelPer=()=>{
    return connection.getDeliveryPersonCollection().then((data)=>{
        return data.find().then((delPer)=>{
            if(delPers){
                return delPer
            }else{
                return null
            }
        })
    })
}





module.exports = adminModel;