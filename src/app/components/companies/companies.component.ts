import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDetails } from 'src/app/model/CompanyDetails';
import { JobServiceService } from 'src/app/services/job-service.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  constructor(
    private jobService: JobServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  allCompanies: CompanyDetails[] = []; // Store all companies
  filteredCompanies: CompanyDetails[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  filterText: string = '';

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.jobService.getAllCompanyDetails().subscribe(
      (companyDetails: CompanyDetails[]) => {
        this.allCompanies = companyDetails; // Assign all companies
        this.updateList(); // Initially display all companies
        document.title = 'All Companies - Ctrl+Hired';
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }

  updateList() {
    // Apply filtering to the original list of companies
    this.filteredCompanies = this.allCompanies.filter((company) =>
      company.companyName.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.sortCompanies(); // Apply sorting to the filtered list
  }

  sortCompanies() {
    if (this.sortDirection === 'asc') {
      this.filteredCompanies.sort((a, b) =>
        a.companyName.localeCompare(b.companyName)
      );
    } else {
      this.filteredCompanies.sort((a, b) =>
        b.companyName.localeCompare(a.companyName)
      );
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

  getCompanyJobs(companyName: string) {
    this.router.navigate(['/company/', companyName]);
  }
}
