import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoadingService {

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  setLoading(loading: boolean, url: string): void {
    if (url) {
      if (loading === true) {
        this.loadingMap.set(url, loading);
        this.loadingSubject.next(true);
      } else if (loading === false && this.loadingMap.has(url)) {
        this.loadingMap.delete(url);
      }

      if (this.loadingMap.size === 0) {
        this.loadingSubject.next(false)
      }
    }
  }
}
