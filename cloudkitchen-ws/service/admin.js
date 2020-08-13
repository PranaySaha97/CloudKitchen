const passwordUtils = require('../utilities/passwordUtils');
const model=require('../model/admin')


const adminService = {};

adminService.setupAdmin= (pass) => { 

    return passwordUtils.genPassword(pass).then((hashed_pass)=>{
         pass= hashed_pass
        return model.setupAdmin(pass).then((user)=>{
            if(user){
                return "Password set"
            }else{
                let err = new Error('Unable to  setup user.')
                err.status = 500
                throw err
            }
        })
    })

}

adminService.login_admin = (contact,pass) =>{
    return model.login_admin(contact).then((ad)=>{
        if(ad){
            return passwordUtils.validPassword(pass, ad.password).then((same)=>{
                if (same){
                    const tokenObj = passwordUtils.issueJWT(ad)
                    return {success: true, user: ad, token: tokenObj.token, expiresIn: tokenObj.expires}
                }else{
                    err = new Error('Password Mismatched')
                    err.status = 404
                    throw err
                }
            })

        }else{
            err = new Error('Admin not found')
            err.status = 404
            throw err
        }
    })
}


module.exports = adminService;