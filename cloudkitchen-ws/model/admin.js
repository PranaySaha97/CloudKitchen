var connection = require('../utilities/connection');

const customerData = [
    {
        
    }
]

const adminModel = {}

adminModel.setupDb = () => {
return connection.getAdminCollection().then((user) => {
    return user.deleteMany().then(() => {
        return user.insertMany(adminData).then(() => {
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

module.exports = adminModel;