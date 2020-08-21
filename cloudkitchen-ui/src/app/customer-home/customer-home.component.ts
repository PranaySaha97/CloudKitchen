import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  searchedKey: string;
  searchOutcomes: any;
  errorMessage: string;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  searchFood = () => {
    this.customerService.seachFood(this.searchedKey).subscribe(
      (data) => { this.searchOutcomes = data; },
      (error) => { this.errorMessage = 'Sorry! We didn\'t find what you are looking for. Try searching for something else 🍟!!'}
    )
  }

}
