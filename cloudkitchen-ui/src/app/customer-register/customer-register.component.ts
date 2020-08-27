import { Router } from '@angular/router';
import { CustomerService } from './../service/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  regForm: FormGroup ;
  errorMessage: string;
  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      mobileNum: ['', [Validators.required, Validators.pattern(/^[6-9]+[0-9]{9}$/)]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.max(999999), Validators.min(100000)]],
      profilePic: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register = () => {
    const userData = this.regForm.value;
    this.customerService.customer_register(userData).subscribe(
      (success) => {this.errorMessage = null;
                    this.router.navigate(['login'] );
    },
      (err) => { this.errorMessage = err.error.message; }
    );
  }

  loginRedirect = () => {
    this.router.navigate(['login']);
  }

}
