import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'job-board';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route && route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route !== null && route !== undefined),
        mergeMap((route) => route!.data),
        map((data) => {
          let title = data['title'] || 'Default Title';
          let route = this.activatedRoute.firstChild;
          while (route && route.firstChild) {
            route = route.firstChild;
          }
          const companyName = route?.snapshot.paramMap.get('companyName');
          if (companyName) {
            title = `${companyName} - ${title}`;
          }
          return title;
        })
      )
      .subscribe((title: string) => {
        document.title = title;
      });
  }
}
