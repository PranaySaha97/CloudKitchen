import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-edit-menu',
  templateUrl: './restaurant-edit-menu.component.html',
  styleUrls: ['./restaurant-edit-menu.component.css']
})
export class RestaurantEditMenuComponent implements OnInit {



  user: any = JSON.parse(sessionStorage.getItem('current_user'));
  restaurantData:any;
  img: any;
  imageData: Blob;
  editForm: FormGroup;
  userData: FormData = new FormData();
  foodData:any;
  errorMessage:string;
  constructor(private service: RestaurantServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
     this.restaurantData= JSON.parse(sessionStorage.getItem('current_user'));
     this.service.getFoodDetails().subscribe(
       success=>this.foodData=success,
       error=>this.errorMessage=error.error.message
     )
    this.service.getFoodPicture("R1").subscribe(
      (image) => {this.img = this.createImageFromBlob(image);
                  this.imageData = image;
                  console.log(this.imageData);
      }
    );

    this.editForm = this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      category:['',[Validators.required]],
      type:['',[Validators.required]],
      veg:[''],
      price:['',[Validators.required]],
      discount:['',[Validators.required]],
      available:[''],
      img:['',[Validators.required]],
      restaurantId:[this.restaurantData.restaurantId]
    });
  }

  createImageFromBlob = (image: Blob) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.img = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 checkFile = (event) => {
  if ( event.target.files.length > 0 ){
    const file = event.target.files[0];
    this.editForm.get('img').setValue(file);
  }
 }

 edit = () => {
   if (this.editForm.value.profilePic.length === 0){
      this.editForm.get('img').setValue(this.imageData);
      this.userData.append('img', this.editForm.value.img, this.editForm.value.img.name);
   }else{
    this.userData.append('img', this.editForm.value.img, this.editForm.value.img.name);
   }
   this.userData.append('name', this.editForm.value.name);
  this.userData.append('description', this.editForm.value.description);
  this.userData.append('category', this.editForm.value.category);
  this.userData.append('type', this.editForm.value.type);
  this.userData.append('veg', this.editForm.value.veg);
  this.userData.append('price', this.editForm.value.price);
  this.userData.append('discount', this.editForm.value.discount);
  this.userData.append('available', this.editForm.value.available);
  this.userData.append('restaurantId', this.editForm.value.restaurantId);
  

   this.service.updateFood(this.userData).subscribe(
     (success) => {
       sessionStorage.removeItem('current_user');
       sessionStorage.setItem('current_user', JSON.stringify(success));
       this.router.navigate(['restaurant/viewFood']);
     }
   );
 }

}

