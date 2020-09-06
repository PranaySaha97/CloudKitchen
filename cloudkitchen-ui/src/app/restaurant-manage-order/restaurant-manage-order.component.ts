import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-manage-order',
  templateUrl: './restaurant-manage-order.component.html',
  styleUrls: ['./restaurant-manage-order.component.css']
})
export class RestaurantManageOrderComponent implements OnInit {
  
  
  restaurantOrders:any
  errorMessage:string
  constructor(private service:RestaurantServiceService,private router:Router) { }
   
  ngOnInit(): void {
    
    this.service.restaurantOrders().subscribe(
      success=>{this.restaurantOrders=success
      console.log(this.restaurantOrders)},
      error=>this.errorMessage=error.error.message
    )
  }

}
