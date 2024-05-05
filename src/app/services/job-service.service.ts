import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Job } from '../model/Job.model';

@Injectable({
  providedIn: 'root',
})
export class JobServiceService {
  private apiUrl = 'https://api.example.com/jobs'; // Adjust URL as necessary

  constructor(private http: HttpClient) {}

  // getJobs(limit: number, offset: number): Observable<Job[]> {
  //   return this.http.get<Job[]>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  // }

  // getJobByTitle(title: string): Observable<Job> {
  //   //     return this.http.get<Job>(`${this.apiUrl}?title=${title}`);
  //   const job: Job = {
  //     title: 'Full Stack Engineer',
  //     location: 'New York, NY',
  //     companyLogo:
  //       'https://jboardio.s3-us-west-1.amazonaws.com/default/employers/apple.png',
  //     companyName: 'Apple',
  //     departments: ['Engineering', 'IT'],
  //   };

  //   return of(job);
  // }

  // getJobs(limit: number, offset: number): Observable<Job[]> {
  //   // Example static data for demonstration
  //   const exampleJobs: Job[] = [
  //     {
  //       title: 'Software Engineer',
  //       location: 'San Francisco, CA',
  //       companyLogo: 'https://example.com/logo1.png',
  //       companyName: 'Example Company 1',
  //       departments: ['Engineering', 'IT'],
  //     },
  //     {
  //       title: 'Marketing Manager',
  //       location: 'New York, NY',
  //       companyLogo: 'https://example.com/logo2.png',
  //       companyName: 'Example Company 2',
  //       departments: ['Marketing'],
  //     },
  //     // Add more example jobs here...
  //   ];

  //   // Simulating pagination with limit and offset
  //   const startIndex = offset;
  //   const endIndex = Math.min(offset + limit, exampleJobs.length);
  //   const slicedJobs = exampleJobs.slice(startIndex, endIndex);

  //   return of(slicedJobs); // Emit the slicedJobs array as an observable
  // }
}
