import { CustomerViewOrdersComponent } from './customer-view-orders/customer-view-orders.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { CustomerEditProfileComponent } from './customer-edit-profile/customer-edit-profile.component';
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
import{RestaurantLoginGuard} from './gaurds/restaurant-login.guard'
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantAddMenuComponent } from './restaurant-add-menu/restaurant-add-menu.component';
import { RestaurantViewRestaurantProfileComponent } from './restaurant-view-restaurant-profile/restaurant-view-restaurant-profile.component';
import { RestaurantEditRestaurantProfileComponent } from './restaurant-edit-restaurant-profile/restaurant-edit-restaurant-profile.component';
import { AdminLoginGuard } from './gaurds/admin-login.guard';
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
        path: 'edit-profile',
        component: CustomerEditProfileComponent,
        canActivate: [CustomerLoginGuard]
    }, {
        path: 'view-cart',
        component: CustomerCartComponent,
        canActivate: [CustomerLoginGuard]
    }, {
        path: 'view-orders',
        component: CustomerViewOrdersComponent,
        canActivate: [CustomerLoginGuard]
    }, {
        path: 'admin',
        component: AdminHomeComponent,
        canActivate:[AdminLoginGuard]
    }, {
        path: 'admin/login',
        component: AdminLoginComponent
    }, {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate:[AdminLoginGuard]
    }, {
        path: 'admin/deliverypersons',
        component: AdminDeliveryPersonsComponent,
        canActivate:[AdminLoginGuard]
    }, {
        path: 'admin/restaurants',
        component: AdminRestaurantsComponent,
        canActivate:[AdminLoginGuard]
    }, {
        path: 'admin/customers',
        component: AdminCustomersComponent,
        canActivate:[AdminLoginGuard]
    },
     {
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
    }, 
    //paths for retaurant
    {
        path:'restaurant/login',component:RestaurantLoginComponent
    },
    {
        path:'restaurant/register',component:RestaurantRegisterComponent
    },
    {
        path:'restaurant/home',component:RestaurantHomeComponent,canActivate:[RestaurantLoginGuard]
    },
    {
        path:'restaurant/addFood',component:RestaurantAddMenuComponent,canActivate:[RestaurantLoginGuard]
    },
    {
        path:'restaurant/viewRestaurantProfile',component:RestaurantViewRestaurantProfileComponent
    },
    {
        path:'restaurant/editRestaurantProfile',component:RestaurantEditRestaurantProfileComponent
    },
    {
        path:'restaurant/addFood',component:RestaurantAddMenuComponent
    },
 
    {
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
