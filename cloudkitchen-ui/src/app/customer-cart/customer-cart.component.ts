import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  orderingCart: any;
  user: any = JSON.parse(localStorage.getItem('current_user'));
  totalPrice: number = 0;
  orderObj: any = {};
  foodIds: Array<string> = [];
  restId: string;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.orderingCart = this.customerService.getOrderedFood();

    for (const orders of this.orderingCart){
      this.totalPrice += (orders.price * ( 1 - (orders.discount / 100)));
      this.foodIds.push(orders.foodId);
      this.restId = orders.restaurantId;
    }

    this.orderObj.deliveryPerson = '';
    this.orderObj.food = this.foodIds;
    this.orderObj.state = 'Pending';
    this.orderObj.restaurant = this.restId;
    this.orderObj.customer = this.user.customerId;
    this.orderObj.totalCost = this.totalPrice;
    this.orderObj.orderDate = new Date().toDateString();

  }

  order = () => {
    this.customerService.orderFood(this.orderObj).subscribe(
      (success) => {
        console.log('Done');
      }
    );
  }

}
