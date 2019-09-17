import { LoaderService } from './../common/loader.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
export interface LoaderState {
    show: boolean;
    sideNavState: boolean;
    userName?: string;
}

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public show = false;
  private subscription: Subscription;
  private appLoaderCollapsed = false;
  @Input()  appLoader = false;
  @Input()  userName: string;
  @Input()  staticPgLoader = false;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                this.appLoaderCollapsed = state.sideNavState;
                this.userName = state.userName;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
