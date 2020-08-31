import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import{RestaurantServiceService} from 'src/app/service/restaurant-service.service'
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  constructor(private fb:FormBuilder,private service:RestaurantServiceService,private router:Router) { 
         
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    })
  }
  loginUser(){
    console.log("i am here")
    this.service.restaurantLogin(this.loginForm.value).subscribe(
      
      success=>{
        this.errorMessage = null;
                     localStorage.setItem('current_user', JSON.stringify(success.user));
                     localStorage.setItem('token', success.token);
                     localStorage.setItem('user_type', 'customer');
                     localStorage.setItem('expires', JSON.stringify( moment().add(success.expiresIn).valueOf()));
                     this.router.navigate(['/restaurant/home']);
                     
      },
      error=>{
           this.errorMessage=error.error.message
      }
    )
  
}
}

