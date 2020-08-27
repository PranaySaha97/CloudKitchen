import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required, Validators.pattern(/^[6-9]+[0-9]{9}$/)]],
      pass: ['', [Validators.required]],
    });
  }

  login = () => {
    const credentials = this.loginForm.value;
    this.customerService.customer_login(credentials).subscribe(
      (userData) => {this.errorMessage = null;
                     localStorage.setItem('current_user', JSON.stringify(userData));
                     this.router.navigate(['']);
    },
      (err) => { this.errorMessage = err.error.message; }
    );
  }

  registerRedirect = () => {
    this.router.navigate(['register']);
  }

}
