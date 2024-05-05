import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ViewJobComponent } from './components/view-job/view-job.component';

const routes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'viewJob/:title', component: ViewJobComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' } // Redirect to flights by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
