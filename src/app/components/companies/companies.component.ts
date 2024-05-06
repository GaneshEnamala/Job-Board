import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/Job.model';

interface CompanyJob {
  companyName: string;
  logo: string;
  count: number;
}
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {

  exampleJobs: Job[] = [
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
  ];
  
  companyJobs: CompanyJob[] = [];
  filteredJobs: CompanyJob[] = [];
  sortDirection: 'asc' | 'desc' = 'asc'; // default sorting
  filterText: string = '';

  ngOnInit() {
    this.processJobs();
    this.updateList();
  }

  processJobs() {
    const companyMap = new Map();

    for (const job of this.exampleJobs) {
      if (companyMap.has(job.companyName)) {
        companyMap.get(job.companyName).count += 1;
      } else {
        companyMap.set(job.companyName, {
          logo: job.companyLogo,
          count: 1
        });
      }
    }

    this.companyJobs = Array.from(companyMap, ([companyName, data]) => ({
      companyName,
      logo: data.logo,
      count: data.count
    }));
  }

  updateList() {
    this.sortCompanies();
    this.filteredJobs = this.companyJobs.filter(job => 
      job.companyName.toLowerCase().includes(this.filterText.toLowerCase()));
  }

  sortCompanies() {
    if (this.sortDirection === 'asc') {
      this.companyJobs.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else {
      this.companyJobs.sort((a, b) => b.companyName.localeCompare(a.companyName));
    }
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updateList();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.filterText = target.value;
      this.updateList();
    }
  }  
}
