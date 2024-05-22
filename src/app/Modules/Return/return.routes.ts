import { Routes } from '@angular/router';
// import { HomepageComponent } from './homepage/homepage.component';
// import { ViewProductComponent } from './view-product/view-product.component';
import path from 'path';
import { ViewreturnComponent } from './viewreturn/viewreturn.component';
import { ViewreturnpageComponent } from './viewreturnpage/viewreturnpage.component';
// import { ViewRemittanceComponent } from './view-remittance/view-remittance.component';
// import { NewRemittanceComponent } from './new-remittance/new-remittance.component';
// import { RemittedpageComponent } from './remittedpage/remittedpage.component';
// import { SalesreportpageComponent } from './salesreportpage/salesreportpage.component';
// import { ViewDailySalesComponent } from './view-daily-sales/view-daily-sales.component';
// import { SummaryOfChargesComponent } from './summary-of-charges/summary-of-charges.component';

export const returnRoutes: Routes = [
    {path:'viewreturnpage', component: ViewreturnpageComponent,
        children:[
            {path: 'viewreturn', component: ViewreturnComponent},
            // {path: 'Summary', component: SummaryOfChargesComponent},
           
            {path: '', redirectTo: 'viewreturn', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'viewreturnpage', pathMatch: 'full'}
];
