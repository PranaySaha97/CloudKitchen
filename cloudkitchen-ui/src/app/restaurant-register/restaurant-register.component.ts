import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-register',
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.css']
})
export class RestaurantRegisterComponent implements OnInit {
  public registerForm:FormGroup
  public errorMessage:string=null
  constructor(private fb:FormBuilder,private service:RestaurantServiceService,private router:Router) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      restaurantName: ['', [Validators.required]],
      restaurantMobile: ['', [Validators.required]],
      restaurantEmail:['', [Validators.required]],
      restaurantAddress:['', [Validators.required]],
      restaurantPincode:['', [Validators.required]],
      restaurantAbout:['', [Validators.required]],
      restaurantPassword:['',[Validators.required]],
      restaurantPhoto:['',[Validators.required]]

    })
  }
  registerUser(){
        this.service.restaurantRegister(this.registerForm.value).subscribe(
          success=>{

            this.router.navigateByUrl("/restaurant/login")
          },
          error=>{
            console.log("i am here")
            this.errorMessage=error.error.message
          }
        )
  }

}
