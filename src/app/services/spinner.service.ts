import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private activeRequests = 0;

  activeRequest$ = new BehaviorSubject<number>(0);

  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
    this.activeRequest$.subscribe((value) => {
      if(value > 0) {
        this.visibility.next(true);
      } else {
        this.visibility.next(false);
      }
    })
  }

  show() {
    this.activeRequests++;
    this.activeRequest$.next(this.activeRequests);
  }

  hide() {
    if(this.activeRequests !== 0) {
      this.activeRequests--;
      if(this.activeRequests === 0){
        setTimeout(() => {
          this.activeRequest$.next(this.activeRequests);
        }, 1000);
      }
    }
  }
}
