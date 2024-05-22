import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewProductComponent } from './view-product/view-product.component';

export const HomeRoutes: Routes = [
    {path:'homepage', component: HomepageComponent,
        children:[
            {path: 'viewproduct', component: ViewProductComponent},
            {path: '', redirectTo: 'viewproduct', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'homepage', pathMatch: 'full'}
];
