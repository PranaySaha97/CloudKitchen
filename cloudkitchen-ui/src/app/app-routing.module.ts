import {CustomerHomeComponent} from './customer-home/customer-home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {DeliveryPersonLoginComponent} from './delivery-person-login/delivery-person-login/delivery-person-login.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerHomeComponent
    }, {
        path: 'admin',
        component: AdminHomeComponent
    }, {
        path: 'deliveryperson',
        component: DeliveryPersonLoginComponent
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
