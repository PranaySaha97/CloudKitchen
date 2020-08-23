import { CustomerHotelDetailsComponent } from './customer-hotel-details/customer-hotel-details.component';
import {CustomerHomeComponent} from './customer-home/customer-home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {DeliveryPersonLoginComponent} from './delivery-person-login/delivery-person-login/delivery-person-login.component';
import { DeliveryPersonRegisterComponent } from './delivery-person-register/delivery-person-register/delivery-person-register.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerHomeComponent
    }, {
        path: 'view-restaurant-details/:restaurant_id',
        component: CustomerHotelDetailsComponent
    }, {
        path: 'admin',
        component: AdminHomeComponent
    }, {
        path: 'deliveryperson',
        component: DeliveryPersonLoginComponent
    },
    {
        path: 'deliveryperson/register',
        component: DeliveryPersonRegisterComponent
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
export class AppRoutingModule {}
