import { Routes, RouterModule } from '@angular/router';
import { CashiermainpageComponent } from './cashiermainpage/cashiermainpage.component';
import { HomeRoutes } from './Modules/Home/home.routes';
import { RemittedRoutes } from './Modules/Remitted/remitted.routes';
import { SalesreportRoutes } from './Modules/Salesreport/salesreport.routes';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { returnRoutes } from './Modules/Return/return.routes';



export const routes: Routes = [
    
    {path:'loginpage', component: LoginpageComponent},
    {path:'cashierpage', component: CashiermainpageComponent},
    {path: 'cashiermainpage', component: CashiermainpageComponent,
    children: [
        {
            path: 'homepage',
            loadChildren: () => import('./Modules/Home/home.routes').then(r=>HomeRoutes)
        },
        {
            path: 'remittedpage',
            loadChildren: () => import('./Modules/Remitted/remitted.routes').then(r=>RemittedRoutes)
        },
        {
            path: 'Salesreportpage',
            loadChildren: () => import('./Modules/Salesreport/salesreport.routes').then(r=>SalesreportRoutes)
        },
        {
            path: 'Returnpage',
            loadChildren: () => import('./Modules/Return/return.routes').then(r=>returnRoutes)
        },

        {path: '', redirectTo: 'homepage', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'loginpage', pathMatch:'full'}

];
