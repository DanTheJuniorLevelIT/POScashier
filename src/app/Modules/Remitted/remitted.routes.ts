import { Routes } from '@angular/router';
import path from 'path';
import { ViewRemittanceComponent } from './view-remittance/view-remittance.component';
import { RemittedpageComponent } from './remittedpage/remittedpage.component';
import { UpimgpageComponent } from './upimgpage/upimgpage.component';

export const RemittedRoutes: Routes = [
    {path:'remittedpage', component: RemittedpageComponent,
        children:[
            {path: 'viewremit', component: ViewRemittanceComponent},
            {path: 'upimgpage', component: UpimgpageComponent},
            {path: '', redirectTo: 'viewremit', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'remittedpage', pathMatch: 'full'}
];
