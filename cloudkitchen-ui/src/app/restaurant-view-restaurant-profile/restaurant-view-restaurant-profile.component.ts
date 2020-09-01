import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';

@Component({
  selector: 'app-restaurant-view-restaurant-profile',
  templateUrl: './restaurant-view-restaurant-profile.component.html',
  styleUrls: ['./restaurant-view-restaurant-profile.component.css']
})
export class RestaurantViewRestaurantProfileComponent implements OnInit {
 public restaurantData:object=null
 public errorMessage:string=null
  constructor(private service:RestaurantServiceService) { }

  ngOnInit(): void {
    this.getRestaurantDetails()
  }
  getRestaurantDetails(){
     this.service.getRestaurantDetails().subscribe(
       success=>{
         this.restaurantData=success
         console.log(this.restaurantData[0].restaurantId)
        },
       error=>this.errorMessage=error.error.message
     )
  }
}
