import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { delay } from 'rxjs/operators';
import { SpinnerLoadingService } from '../spinner-loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  routerLoading: boolean = false;
  httpLoading: boolean = false;

  constructor(private router: Router,
    private spinner: SpinnerLoadingService) {

    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouerEvent(routerEvent);
    });
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.loading()
  }

  loading() {
    this.spinner.loadingSubject.pipe(delay(0)).subscribe(loading => {
      this.httpLoading = loading
    })
  }
  checkRouerEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.routerLoading = true;
    } else if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
      this.routerLoading = false
    }
  }
}
