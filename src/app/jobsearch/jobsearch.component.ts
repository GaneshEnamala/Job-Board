import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.css'],
})
export class JobsearchComponent implements OnInit {
  jobSearch!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.jobSearch = this.fb.group({
      keywords: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  searchJob() {
    const searchData = this.jobSearch.value;
    let keywords = searchData.keywords;
    let location = searchData.location;
    this.router.navigate(['/searchJobs', keywords, location]);
  }
}
