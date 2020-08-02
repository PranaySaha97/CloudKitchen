const {Schema}=require('mongoose');
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.set('useCreateIndex',true);
const uri="mongodb+srv://admin:6S7uCThmEQdLHc6D@cluster1.pu0hb.mongodb.net/bhukkad_db?retryWrites=true&w=majority";

const customerSchema = Schema ({
    customerId : {type :String,required:[true,'customerId required']},
    userName: {type: String, required: [true, 'userName required']},
    password: {type: String, required: [true, 'password required']},
    name: {type: String, required: [true, 'name required']},
    profilePic: {type: String, required: [true, 'profilePic required']},
    email: {type: String, required: [true, 'email required']},
    mobileNum: {type: Number, required: [true, 'mobileNum required']},
    address: {type: String, required: [true, 'address required']},
    pincode: {type: Number, required: [true, 'pincode required']},
}, {collection: "Customers", timestamps: true } );

const restaurantSchema = Schema({
    restaurantId: {type :String,required:[true,'restaurantId required']},
    restaurantName: {type :String,required:[true,'restaurantName required']} ,
    restaurantAddress: {type :String,required:[true,'restaurantAddress required']},
    restaurantPincode: {type :Number,required:[true,'restaurantPincode required']},
    restaurantMobile: {type :Number,required:[true,'restaurantMobile required']},
    restaurantPhoto: {type :String,required:[true,'restaurantPhoto required']},
    restaurantAmbience: {type:Array, default:[]},
    restaurantRating: {type :Number,required:[true,'restaurantRating required']},
    menu: {
        starters: {type:Array, default:[]} ,
        mainCourse:{type:Array, default:[]} ,
        dessert: {type:Array, default:[]} ,
        juices: {type:Array, default:[]} ,
    },
}, {collection: "Restaurants", timestamps: true } );

const foodSchema = Schema ({
    restaurantId: {type :String,required:[true,'restaurantId required']},
    foodId: {type :String,required:[true,'foodId required']},
    img: {type :String,required:[true,'image required']},
    name: {type :String,required:[true,'name required']},
    type: {type :String,required:[true,'type required']},
    category: {type :String,required:[true,'category required']}, 
    veg: {type :Boolean,required:[true,'veg/non-veg required']},
    foodRating: {type :Number,required:[true,'foodRating required']},
    price: {type :Number,required:[true,'price required']},
    discount: {type :Number,required:[true,'discount required']},
    available: {type :Boolean,required:[true,'availability required']},
}, {collection: "Food", timestamps: true } );

const ordersSchema = Schema({
    orderId: {type :String,required:[true,'orderId required']},
    restaurant: {type :String,required:[true,'restaurantId required']},
    customer: {type :String,required:[true,'customerId required']},
    deliveryPerson: {type :String,required:[true,'deliveryPersonId required']},
    food: {type:Array, default:[]},
    deliveryCost:{type :Number,required:[true,'deliveryCost required']},
    totalCost: {type :Number,required:[true,'totalCost required']},
    state: {type :String,required:[true,'state required']},
}, {collection: "Orders", timestamps: true } );

const deliveryPersonSchema = Schema({
    deliveryPersonId: {type :String,required:[true,'deliveryPersonId required']},
    name: {type :String,required:[true,'name required']},
    email: {type :String,required:[true,' email required']},
    mobileNum: {type :String,required:[true,'mobileNum required']},
    penalties: {type:Array, default:[]},
    deliveryPersonRating: {type :String,required:[true,'deliveryPersonRating required']},
}, {collection: "DeliveryPerson", timestamps: true } );

const penaltiesSchema = Schema({
    penaltiesId: {type :String,required:[true,'penalitiesId required']},
    order: {type :String,required:[true,'orderId required']},
    deliveryPerson: {type :String,required:[true,'deliveryPersonId required']},
    penalityCost: {type :Number,required:[true,'penalityCost required']},
    paid: {type :Boolean,required:[true,'paid or not required']},
}, {collection: "Penalities", timestamps: true } );

const connection = {}

connection.getCustomerCollection = () => {
    return mongoose.connect( url, {useNewUrlParser: true} ).then( database => {
        return database.model( 'Customers', customerSchema )
    } ).catch( () => {
        const err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;
    } );
}

connection.getRestautrantCollection = () => {
    return mongoose.connect( uri, {useNewUrlParser: true} ).then( database => {
        return database.model( 'Restaurants', restaurantSchema )
    } ).catch( () => {
        const err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;
    } );
}

connection.getFoodCollection = () => {
    return mongoose.connect( uri, {useNewUrlParser: true} ).then( database => {
        return database.model( 'Food', foodSchema )
    } ).catch( () => {
        const err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;
    } );
}

connection.getOrdersCollection = () => {
    return mongoose.connect( uri, {useNewUrlParser: true} ).then( database => {
        return database.model( 'Orders', ordersSchema )
    } ).catch( () => {
        const err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;
    } );
}

connection.getDeliveryPersonCollection = () => {
    return mongoose.connect( uri, {useNewUrlParser: true} ).then( database => {
        return database.model( 'DeliveryPerson', deliveryPersonSchema )
    } ).catch( () => {
        const err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;
    } );
}

connection.getPenaltiesCollection = () => {
    return mongoose.connect( uri, {useNewUrlParser: true} ).then( database => {
        return database.model( 'Penalities', penaltiesSchema )
    } ).catch( () => {
        const err = new Error( "Could not connect to the database" );
        err.status = 500;
        throw err;
    } );
}

module.exports = connection;