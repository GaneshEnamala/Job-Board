import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleJobDetails} from '../model/GoogleJobDetails';
import { JobDetails } from '../model/JobDetails';
import { CompanyDetails } from '../model/CompanyDetails';

@Injectable({
  providedIn: 'root',
})
export class JobServiceService {
  private baseUrl = 'https://job-board-backend-zxjv.onrender.com';
  // private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<GoogleJobDetails[]> {
    return this.http.get<GoogleJobDetails[]>(`${this.baseUrl}/all`).pipe(
      catchError(error => {
        console.error('Error fetching jobs:', error);
        throw error;
      })
    );
  }

  getJobsByCompany(compmanyName: string): Observable<GoogleJobDetails[]> {
    return this.http.get<GoogleJobDetails[]>(`${this.baseUrl}/byCompany/${compmanyName}`).pipe(
      catchError(error => {
        console.error('Error fetching jobs:', error);
        throw error;
      })
    );
  }

  searchJobs(keywords: string, location:string): Observable<GoogleJobDetails[]> {
    return this.http.get<GoogleJobDetails[]>(`${this.baseUrl}/searchJobs/${keywords}/${location}`).pipe(
      catchError(error => {
        console.error('Error fetching jobs:', error);
        throw error;
      })
    );
  }

  getByJobId(jobId: string): Observable<JobDetails> {
    return this.http.get<JobDetails>(`${this.baseUrl}/byJobId/${jobId}`).pipe(
      catchError(error => {
        console.error('Error fetching jobs:', error);
        throw error;
      })
    );
  }

  getAllCompanyDetails(): Observable<CompanyDetails[]> {
    return this.http.get<CompanyDetails[]>(`${this.baseUrl}/companies`).pipe(
      catchError(error => {
        console.error('Error fetching jobs:', error);
        throw error;
      })
    );
  }
}
