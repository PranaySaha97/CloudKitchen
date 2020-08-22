import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DeliveryPersonServiceService } from '../../service/delivery-person-service.service';
@Component({
  selector: 'app-delivery-person-register',
  templateUrl: './delivery-person-register.component.html',
  styleUrls: ['./delivery-person-register.component.css'],
})
export class DeliveryPersonRegisterComponent implements OnInit {
  public regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DeliveryPersonServiceService
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNum: [
        '',
        [
          Validators.required,
          Validators.min(6000000000),
          Validators.max(9999999999),
        ],
      ],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      reEnterPass: ['', [Validators.required]]
    }, { validator: validateReenteredPassword });
  }

  registerUser() {
    console.log(this.regForm.value);
  }
}

function validateReenteredPassword(input: FormGroup) {
  let pass = input.get('password').value;
  let confPass = input.get('reEnterPass').value;
  return pass === confPass ? null : { "passwordMatchErr": true }
}
