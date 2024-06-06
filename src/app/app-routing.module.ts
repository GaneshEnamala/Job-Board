import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ViewJobComponent } from './components/view-job/view-job.component';

const routes: Routes = [
  { path: 'jobs', component: JobsComponent, data: { title: 'All jobs' } },
  { path: 'company/:companyName', component: JobsComponent, data: { title: 'Ctrl+Hired' } },
  { path: 'searchJobs/:keywords/:location', component: JobsComponent, data: { title: 'Search Jobs - Ctrl+Hired' } },
  { path: 'companies', component: CompaniesComponent, data: { title: 'All Companies - Ctrl+Hired' } },
  { path: 'aboutus', component: AboutusComponent, data: { title: 'About Us - Ctrl+Hired' } },
  { path: 'viewJob/:id', component: ViewJobComponent, data: { title: 'View Job - Ctrl+Hired' } },
  { path: '', redirectTo: '/', pathMatch: 'full', data: { title: 'Home - Ctrl+Hired' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
