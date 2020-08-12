var connection = require('../utilities/connection');

const customerModel = {}

customerModel.genCId = () => {
    let prev 
    return connection.getCustomerCollection().then((data)=>{
        return data.distinct("customerId").then((cId)=>{
            if(cId.length==0){
                return "C1001"
            }
            else{
                prev=cId.pop();
                prev=prev.substr(1);
                prev=Number(prev)
                prev=prev+1
                return "C" + String(prev)
            }
        })
    })
}

// checks if any data for customer is available in db 
customerModel.testFunction = () => {
    return connection.getCustomerCollection().then((data) => {
        return data.find().then(customers => {
            if (customers.length > 0) {
                return customers
            }
            else return false
        })
    })
}

customerModel.register_user = (new_cust) =>{
    return connection.getCustomerCollection().then((customers)=>{
<<<<<<< HEAD
        return customers.create(new_cust).then((cust)=>{
            if(cust){
                return cust
            }else{
                return null
            }
        })
=======
        return customerModel.genCId().then((cId)=>{
            new_cust.customerId=cId
            return customers.insertMany([new_cust,]).then((cust)=>{
                if(cust){
                    return cust
                }else{
                    return null
                }
            })
        })       
>>>>>>> e12ccf227c38e10ab58757c6c3ad603999423965
    })
}

customerModel.login_user = (contact) => {
    return connection.getCustomerCollection().then(customers=>{
        return customers.findOne({'mobileNum': contact}).then((cust)=>{
            if(cust){
                return cust
            }else{
                return null
            }
        })
    })
}

module.exports = customerModel;