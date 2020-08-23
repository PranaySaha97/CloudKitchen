class  restaurant{
constructor(obj){
    this.restaurantId='';
    this.restaurantPassword=obj.restaurantPassword;
    this.restaurantName=obj.restaurantName;
    this.restaurantAddress= obj.restaurantAddress;
    this.restaurantEmail=obj.restaurantEmail;
    this.restaurantAbout= obj.restaurantAbout;
    this.restaurantPincode= obj.restaurantPincode;
    this.restaurantMobile= obj.restaurantMobile;
    this.restaurantPhoto= obj.restaurantPhoto;
    this.restaurantRating=obj.restaurantRating;
}
}
module.exports = restaurant;

class food{
    constructor(obj){
        this.foodId="";
        this.restaurantId=obj.restaurantId;
        this.img=obj.img;
        this.name=obj.name;
        this.description= obj.description;
        this.category=obj.category;
        this.type=obj.category;
        this.veg=this.veg;
        this.price=obj.price;
        this.discount=obj.discount;
        this.available=obj.available;

    }
}
module.exports = food;