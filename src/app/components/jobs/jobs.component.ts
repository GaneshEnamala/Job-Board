import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/Job.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  offset = 0;
  limit = 4;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.getJobs(this.limit, this.offset).subscribe(
      (data: Job[]) => {
        this.jobs = [...this.jobs, ...data];
        this.offset += this.limit;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  getJobs(limit: number, offset: number): Observable<Job[]> {
    const exampleJobs: Job[] = [
      {
        title: 'Full Stack Engineer',
        location: 'New York, NY',
        companyLogo:
          'https://jboardio.s3-us-west-1.amazonaws.com/default/employers/apple.png',
        companyName: 'Apple',
        departments: ['Engineering', 'IT'],
      },
      {
        title: 'Software Developer',
        location: 'Hyderabad, India',
        companyLogo:
          'https://d3535lqr6sqxto.cloudfront.net/employers/o8Ejh819omNX8njlQTbhst6Lacg6Kp0YSV3NF1Op.jpeg',
        companyName: 'Spotify',
        departments: ['Engineering', 'IT'],
      },

      {
        title: 'Network Engineer, Wireless Connectivity Deployment ',
        location: 'Hyderabad, India',
        companyLogo:
          'https://d3535lqr6sqxto.cloudfront.net/employers/yguknWBnH1l3IL9xi3hcQxCywT3IUrEpHRgOJN3s.jpeg',
        companyName: 'Meta',
        departments: ['Internship'],
      },
      {
        title: 'Senior Software Engineer, Production Media Engineering',
        location: 'Hyderabad, India',
        companyLogo:
          'https://jboardio.s3-us-west-1.amazonaws.com/default/employers/netflix.png',
        companyName: 'Netflix',
        departments: ['Internship'],
      },
      {
        title: 'Data Scientist, Global Supply Chain',
        location: 'Seattle, USA',
        companyLogo:
          'https://d3535lqr6sqxto.cloudfront.net/employers/xo6QERcPGq8kj6qQIFvhsSxaemApQSdNjq7eAAeL.png',
        companyName: 'Starbucks',
        departments: ['Part-time'],
      },
      // Add more example jobs here...
    ];

    // Simulating pagination with limit and offset
    const startIndex = offset;
    const endIndex = Math.min(offset + limit, exampleJobs.length);
    const slicedJobs = exampleJobs.slice(startIndex, endIndex);

    return of(slicedJobs); // Emit the slicedJobs array as an observable
  }
  viewJobDetails(job: Job) {
    this.router.navigate(['/viewJob', job.title]);
  }
}
