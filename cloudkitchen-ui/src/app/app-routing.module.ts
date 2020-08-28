import { CustomerLoginGuard } from './gaurds/customer-login.guard';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerHotelDetailsComponent } from './customer-hotel-details/customer-hotel-details.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DeliveryPersonLoginComponent } from './delivery-person-login/delivery-person-login/delivery-person-login.component';
import { DeliveryPersonRegisterComponent } from './delivery-person-register/delivery-person-register/delivery-person-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminDeliveryPersonsComponent } from './admin-delivery-persons/admin-delivery-persons.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';
import { DeliveryPersonViewOrdersComponent } from './delivery-person-view-orders/delivery-person-view-orders/delivery-person-view-orders.component';
import { DpLoginGaurdGuard } from './gaurds/dp-login-gaurd.guard'
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerHomeComponent
    }, {
        path: 'view-restaurant-details/:restaurant_id',
        component: CustomerHotelDetailsComponent
    }, {
        path: 'login',
        component: CustomerLoginComponent
    }, {
        path: 'register',
        component: CustomerRegisterComponent
    }, {
        path: 'view-profile',
        component: CustomerViewProfileComponent,
        canActivate: [CustomerLoginGuard]
    }, {
        path: 'admin',
        component: AdminHomeComponent
    }, {
        path: 'admin/login',
        component: AdminLoginComponent
    }, {
        path: 'admin/orders',
        component: AdminOrdersComponent
    }, {
        path: 'admin/deliverypersons',
        component: AdminDeliveryPersonsComponent
    }, {
        path: 'admin/restaurants',
        component: AdminRestaurantsComponent
    }, {
        path: 'admin/customers',
        component: AdminCustomersComponent
    },{
        path: 'restaurant/login',
        component: RestaurantLoginComponent
    }, {
        path: 'deliveryperson/login',
        component: DeliveryPersonLoginComponent
    },
    {
        path: 'deliveryperson/register',
        component: DeliveryPersonRegisterComponent
    }, {
        path: 'deliveryperson/vieworders',
        component: DeliveryPersonViewOrdersComponent,
        canActivate: [DpLoginGaurdGuard]
    }, {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
