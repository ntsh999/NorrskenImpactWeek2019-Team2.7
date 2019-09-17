import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export interface LoaderState {
    show: boolean;
    sideNavState: boolean;
    userName?: string;
}

@Injectable()

export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    isShow = false;
    welcomeFlag = false;
    userName: string;
    sideNavExpanded = true;

    constructor() {
        this.sideNavExpanded = true;
    }

    show() {
        this.isShow = true;
        this.loaderSubject.next(<LoaderState>{show: this.isShow, sideNavState: this.sideNavExpanded, userName: this.userName});
    }

    hide() {
        this.isShow = false;
        this.loaderSubject.next(<LoaderState>{show: this.isShow, sideNavState: this.sideNavExpanded, userName: this.userName});
    }
    toggleSideNav() {
        this.loaderSubject.next(<LoaderState>{show: this.isShow, sideNavState: this.sideNavExpanded,  userName: this.userName});
    }

}
