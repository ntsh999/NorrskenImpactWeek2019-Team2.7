import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
@Injectable()
export class ScrollService {
  // scrollObs: Observable<any>;
  resizeObs: Observable<any>;
  pos: number;
  private scrollSub: Subscription = new Subscription();
  private resizeSub: Subscription = new Subscription();
  public scrollObs = new Subject();
  constructor() {
    // set initial value
    this.manageScrollPos('type');
    // create observable for changes in screen size
    this.resizeObs = Observable.fromEvent(window, 'resize');
    // initiate subscription to update values
    this.resizeSub = this.resizeObs.subscribe(() =>
      this.manageScrollPos('resize')
    );

    // create observable that we can subscribe to from component or directive
    this.scrollObs.next();
    window.addEventListener(
      'scroll', () => {
        this.scrollObs.next();
      },
      true
    ); //third parameter
    // initiate subscription to update values
    this.scrollSub = this.scrollObs.subscribe(() =>
      this.manageScrollPos('scroll')
    );
  }
  private manageScrollPos(type): void {
    // update service property
    this.pos = window.pageYOffset;
  }

  // ngOnDestroy(): void {
  //   this.scrollSub.unsubscribe();
  //   this.resizeSub.unsubscribe();
  // }
}
