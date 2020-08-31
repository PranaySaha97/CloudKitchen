import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  public loading: boolean = false;

  constructor(private fb: FormBuilder,
    private service: AdminService,
    private route: Router) { }

  ngOnInit():void {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required,Validators.pattern(/^[6-9]+[0-9]{9}$/)]],
      pass: ['', [Validators.required]],
    })
  }

  login(){
    const cred = this.loginForm.value;
    this.loading = true
    this.service.adminLogin(cred).subscribe(
      (adminData) => {        
                     this.loading = false;
                     this.errorMessage = null;
                     localStorage.setItem('current_user', JSON.stringify(adminData.user));
                     localStorage.setItem('token', adminData.token);
                     localStorage.setItem('user_type', 'admin');
                     localStorage.setItem('expires', JSON.stringify( moment().add(adminData.expiresIn).valueOf()));
                     this.route.navigate(['/admin']);
    },
      (err) =>   
      { 
        this.loading = false
        this.errorMessage = err.error.message; 
      }
    );
  }

}
