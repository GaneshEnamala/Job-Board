import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/Job.model';
import { Observable, of } from 'rxjs';
import { JobServiceService } from 'src/app/services/job-service.service';
import { GoogleJobDetails } from 'src/app/model/GoogleJobDetails';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  offset = 0;
  limit = 2;
  loadMore = true;
  jobsType: string = 'all Jobs';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const companyName = params['companyName'];
      if (companyName) {
        this.jobsType = companyName + ' Jobs';
        this.loadJobsByCompany(companyName);
      } else {
        this.route.paramMap.subscribe((innerParams) => {
          let keywords = innerParams.get('keywords') || '';
          let location = innerParams.get('location') || '';
          if (keywords || location) {
            if (keywords == '') keywords = 'NILL';
            if (location == '') location = 'NILL';
            this.searchJobs(keywords, location);
          } else {
            this.loadJobs();
          }
        });
      }
    });
  }

  loadJobs() {
    // this.getJobs(this.limit, this.offset).subscribe(
    //   (data: Job[]) => {
    //     if (data.length == 0) {
    //       this.loadMore = false;
    //     }
    //     this.jobs = [...this.jobs, ...data];
    //     this.offset += this.limit;
    //   },
    //   (error) => {
    //     console.error('Error fetching jobs:', error);
    //   }
    // );
    this.jobService.getAllJobs().subscribe(
      (googleJobDetails: GoogleJobDetails[]) => {
        if (googleJobDetails.length == 0) {
          this.loadMore = false;
        }

        this.jobs = googleJobDetails.map((jobDetails: GoogleJobDetails) => {
          return {
            id: jobDetails.id,
            title: jobDetails.title,
            location: jobDetails.location,
            companyLogo: jobDetails.companyLogo, // Manually setting companyLogo to logo
            companyName: jobDetails.company,
            departments: ['it'], // Initialize with an empty array
          };
        });
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  getJobs(limit: number, offset: number): Observable<Job[]> {
    const exampleJobs: Job[] = [
      {
        id: '1',
        title: 'Full Stack Engineer',
        location: 'New York, NY',
        companyLogo:
          'https://jboardio.s3-us-west-1.amazonaws.com/default/employers/apple.png',
        companyName: 'Apple',
        departments: ['Engineering', 'IT'],
      },
      {
        id: '2',
        title: 'Software Developer',
        location: 'Hyderabad, India',
        companyLogo:
          'https://d3535lqr6sqxto.cloudfront.net/employers/o8Ejh819omNX8njlQTbhst6Lacg6Kp0YSV3NF1Op.jpeg',
        companyName: 'Spotify',
        departments: ['Engineering', 'IT'],
      },

      {
        id: '3',
        title: 'Network Engineer, Wireless Connectivity Deployment ',
        location: 'Hyderabad, India',
        companyLogo:
          'https://d3535lqr6sqxto.cloudfront.net/employers/yguknWBnH1l3IL9xi3hcQxCywT3IUrEpHRgOJN3s.jpeg',
        companyName: 'Meta',
        departments: ['Internship'],
      },
      {
        id: '4',
        title: 'Senior Software Engineer, Production Media Engineering',
        location: 'Hyderabad, India',
        companyLogo:
          'https://jboardio.s3-us-west-1.amazonaws.com/default/employers/netflix.png',
        companyName: 'Netflix',
        departments: ['Internship'],
      },
      {
        id: '5',
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
    this.router.navigate(['/viewJob', job.id]);
  }

  loadJobsByCompany(companyName: string) {
    console.log('Loading jobs for company:', companyName);
    this.jobService.getJobsByCompany(companyName).subscribe(
      (googleJobDetails: GoogleJobDetails[]) => {
        if (googleJobDetails.length == 0) {
          this.loadMore = false;
          this.jobsType = this.jobsType + ' Not found';
        }
        this.jobs = googleJobDetails.map((jobDetails: GoogleJobDetails) => {
          return {
            id: jobDetails.id,
            title: jobDetails.title,
            location: jobDetails.location,
            companyLogo: jobDetails.companyLogo,
            companyName: jobDetails.company,
            departments: ['it'],
          };
        });
        console.log('Fetched jobs:', this.jobs);
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  searchJobs(keywords: string, location: string) {
    console.log('searching jobs with :', keywords, location);
    this.jobService.searchJobs(keywords, location).subscribe(
      (googleJobDetails: GoogleJobDetails[]) => {
        if (googleJobDetails.length == 0) {
          this.loadMore = false;
          if (keywords == 'NILL')
            this.jobsType = '"No jobs found in' + location + '"';
          else if (location == 'NILL')
            this.jobsType = '"No jobs found with ' + keywords + '"';
          else
            this.jobsType =
              '"No jobs found with ' + keywords + ' in ' + location + '"';
        } else {
          if (keywords == 'NILL')
            this.jobsType = '"' + 'jobs in ' + location + '"';
          else if (location == 'NILL')
            this.jobsType = '"' + keywords + ' jobs' + '"';
          else this.jobsType = '"' + keywords + ' jobs in ' + location + '"';
          this.jobs = googleJobDetails.map((jobDetails: GoogleJobDetails) => {
            return {
              id: jobDetails.id,
              title: jobDetails.title,
              location: jobDetails.location,
              companyLogo: jobDetails.companyLogo,
              companyName: jobDetails.company,
              departments: ['it'],
            };
          });
        }
        console.log('Fetched jobs:', this.jobs);
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }
}
