import { Routes } from '@angular/router';
// import { HomepageComponent } from './homepage/homepage.component';
// import { ViewProductComponent } from './view-product/view-product.component';
import path from 'path';
// import { ViewRemittanceComponent } from './view-remittance/view-remittance.component';
// import { NewRemittanceComponent } from './new-remittance/new-remittance.component';
// import { RemittedpageComponent } from './remittedpage/remittedpage.component';
import { SalesreportpageComponent } from './salesreportpage/salesreportpage.component';
import { ViewDailySalesComponent } from './view-daily-sales/view-daily-sales.component';
import { SummaryOfChargesComponent } from './summary-of-charges/summary-of-charges.component';

export const SalesreportRoutes: Routes = [
    {path:'salesreportpage', component: SalesreportpageComponent,
        children:[
            {path: 'viewdaily', component: ViewDailySalesComponent},
            {path: 'Summary', component: SummaryOfChargesComponent},
           
            {path: '', redirectTo: 'viewdaily', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'salesreportpage', pathMatch: 'full'}
];
