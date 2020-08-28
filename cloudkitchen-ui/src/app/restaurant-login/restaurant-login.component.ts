import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import{RestaurantServiceService} from 'src/app/service/restaurant-service.service'
@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  constructor(private fb:FormBuilder,private service:RestaurantServiceService) { 
         
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  loginUser(){
    this.service.restaurantLogin(this.loginForm.value).subscribe(
      success=>{
        sessionStorage.setItem('token', success.token);
      sessionStorage.setItem('user', success.user);
      location.reload()
      },
      error=>{
           this.errorMessage=error.error.message
      }
    )
  
}
}

