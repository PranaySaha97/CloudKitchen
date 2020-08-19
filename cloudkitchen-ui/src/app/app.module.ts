import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminDeliveryPersonsComponent } from './admin-delivery-persons/admin-delivery-persons.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerHotelDetailsComponent } from './customer-hotel-details/customer-hotel-details.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { CustomerViewOrdersComponent } from './customer-view-orders/customer-view-orders.component';
import { CustomerEditProfileComponent } from './customer-edit-profile/customer-edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminOrdersComponent,
    AdminRestaurantsComponent,
    AdminCustomersComponent,
    AdminDeliveryPersonsComponent,
    CustomerHomeComponent,
    CustomerLoginComponent,
    CustomerRegisterComponent,
    CustomerHotelDetailsComponent,
    CustomerCartComponent,
    CustomerViewProfileComponent,
    CustomerViewOrdersComponent,
    CustomerEditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
