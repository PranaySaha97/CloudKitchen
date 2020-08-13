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
                return result
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

module.exports = adminModel;