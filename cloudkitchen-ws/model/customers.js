var connection = require('../utilities/connection');

const customerModel = {}

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
        return customers.create(new_cust).then((cust)=>{
            if(cust){
                return cust
            }else{
                return null
            }
        })
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