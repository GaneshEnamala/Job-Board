import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ViewJobComponent } from './components/view-job/view-job.component';
import { HttpClientModule } from '@angular/common/http'; 
import { SafeHtmlPipe } from './services/SafeHtmlPipe';
import { JobsearchComponent } from './jobsearch/jobsearch.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    CompaniesComponent,
    AboutusComponent,
    ViewJobComponent,
    SafeHtmlPipe,
    JobsearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
