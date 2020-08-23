import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-hotel-details',
  templateUrl: './customer-hotel-details.component.html',
  styleUrls: ['./customer-hotel-details.component.css']
})
export class CustomerHotelDetailsComponent implements OnInit {

  restaurantDetails: any;
  restaurantId: string;
  searchKeyword: string;
  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params) => {this.restaurantId = params.restaurant_id; }
    );

    this.customerService.getRestaurantDetails(this.restaurantId).subscribe(
      (details) => { this.restaurantDetails = details; }
    );
  }

  goHome = () => {
    this.router.navigate(['']);
  }

}
