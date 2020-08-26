import { Component, OnInit } from '@angular/core';
import { DeliveryPersonServiceService } from 'src/app/service/delivery-person-service.service';

@Component({
  selector: 'app-delivery-person-view-orders',
  templateUrl: './delivery-person-view-orders.component.html',
  styleUrls: ['./delivery-person-view-orders.component.css']
})
export class DeliveryPersonViewOrdersComponent implements OnInit {
  public orders: Array<any>;
  public errorMessage: string;
  public loading: boolean = false;

  constructor(private serv: DeliveryPersonServiceService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.serv.getOrders().subscribe(
      (success) => {
        this.loading = false;
        this.orders = success;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.error.message;
      }
    )
  }

}
