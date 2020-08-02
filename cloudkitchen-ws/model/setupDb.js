const collection=require('../utilities/connection');

const customerDb=[
    {
        "customerId":"C1001",
        "userName":"Shaz97",
        "password":"admin123",
        "name":"Shatakshi Srivastava",
        "email":"admin@gmail.com",
        "profilePic":"xyz",
        "mobileNum": 9599790218,
        "address": "2/672",
        "pincode": "17272",
    },
]

exports.setupDb=()=>{
    return collection.getCustomerCollection().then((user)=>{
        return user.deleteMany().then(()=>{
            return user.insertMany(customerDb).then((data)=>{
                if (data) return "Insertion Successfull"+data
                else{
                let err=new Error("Insertion failed");
                err.status=400;
                throw err;
                 }
            })
        })
    })
}