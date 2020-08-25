import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  Form
} from '@angular/forms';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component'
import { DeliveryPersonServiceService } from 'src/app/service/delivery-person-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-person-login',
  templateUrl: './delivery-person-login.component.html',
  styleUrls: ['./delivery-person-login.component.css']
})
export class DeliveryPersonLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  public loading: boolean = false;

  constructor(private fb: FormBuilder,
    private service: DeliveryPersonServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mobileNum: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  openDialog(message) {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: ' 350px',
      data: { message }
    })
  }

  loginUser() {
    console.log(this.loginForm.value)
    this.loading = true
    this.service.loginDeliveryPerson(this.loginForm.value).subscribe(
      (success) => {
        this.loading = false
        console.log(success)
        sessionStorage.setItem('token', success.token);
        sessionStorage.setItem('user', success.user);
        
      },
      (error) => {
        this.loading = false
        if (typeof error.error.message == 'undefined') {
          this.openDialog("Unable to login at the moment. Please try again later.")
        } else {
          this.openDialog(error.error.message)
        }
      }
    )
  }

}
