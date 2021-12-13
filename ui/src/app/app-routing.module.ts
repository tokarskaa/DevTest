import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './job/job.component';
import { HomeComponent } from './home/home.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'jobs', component: JobComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/:id', component: CustomerDetailsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
