import { Routes } from '@angular/router';
import { ProcessClaimComponent } from './Components/process-claim/process-claim.component';
import { BodyComponent } from './Components/body/body.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component:DashboardComponent},
    {path: 'dashboard', component:DashboardComponent},
    { path: 'process-claim/:id', component: ProcessClaimComponent },

];
