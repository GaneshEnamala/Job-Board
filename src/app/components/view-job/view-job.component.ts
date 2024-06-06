import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JobDetails } from 'src/app/model/JobDetails';
import { JobServiceService } from 'src/app/services/job-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css'],
})


export class ViewJobComponent implements OnInit {
  sanitizedDescription: SafeHtml;
  descripition: string = '';
  jobDetails: JobDetails = {
    id: '',
    title: '',
    company: '',
    location: '',
    applyLink: '',
    actualUrl: '',
    companyLogo: '',
    ldjson: '',
    description: ''
  };

  @Input() ldJson!: string;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedDescription = '';
  }
  
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const jobId = params['id'];
      this.jobService.getByJobId(jobId).subscribe({
        next: (data : JobDetails) => {
          this.jobDetails.description = data.description;
          this.sanitizedDescription = this.decodeAndSanitizeHtml( data.description);
          // this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.jobDetails.description);
          this.jobDetails = data;
          this.ldJson = this.jobDetails.ldjson;
          this.updateLdJsonScriptTag(this.ldJson);
          this.updateTitle(this.jobDetails.title, this.jobDetails.company);
        },
        error: (error) => {
          console.error('Error fetching job details:', error);
        },
      });
    });
  }

  decodeAndSanitizeHtml(encodedHtml: string): SafeHtml {
    const decodedHtml = this.decodeHtmlEntities(encodedHtml);
    const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(decodedHtml);
    return sanitizedHtml;
  }

  private decodeHtmlEntities(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  updateTitle(title: string, company:string): void {
    if (title) {
      document.title = `${title} || ${company} - Ctrl+Hired`;
    } else {
      document.title = 'Ctrl+Hired';
    }
  }

  applyForJob(url : string) {
    // url = url+'?utm_campaign=job_board&utm_medium=organic'
    window.open(url, '_blank');
  }

  private updateLdJsonScriptTag(ldJson: string): void {
    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script') as HTMLScriptElement;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = ldJson;
  }  
}
