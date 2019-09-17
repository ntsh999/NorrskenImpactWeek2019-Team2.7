import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { LoaderService } from './../common/loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/timeoutWith';
import { AlertService } from './alert.service';
import * as _ from 'lodash';
import { UtilityService } from './utility.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  timer = 40000;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public loaderService: LoaderService,
    private utilityService: UtilityService
  ) {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedURLs = [
      'nodeDisk',
      'nodeRAM',
      'nodeCPU',
      'nodeDiskUsed',
      'nodeRAMUsed',
      'nodeCPUUsed',
      'nodeDiskUsedpie',
      'nodeCPUUsedpie',
      'nodeRAMUsedpie',
      'containerCPU',
      'containerRAM',
      'deploymentRAM',
      'deploymentCPU', // \W*(containerNetwork)\W*',
      'containerNetwork',
      'releaseNotes',
      'blog-content',
      'faqs',
      'undermaintenance',
      'blog-list',
      'news'
    ];
    const excluedURLsForToken = [
      'releaseNotes',
      'login',
      'undermaintenance',
      'blog-content',
      'blog-list',
      'statuses',
      'faqs',
      'news',
      'demovolumes'
    ];
    const showLoader = _.find(excludedURLs, item => {
      return req.url.indexOf(item) > -1;
    });
    const isTokenRequired = _.find(excluedURLsForToken, item => {
      return req.url.indexOf(item) > -1;
    });
    if (!showLoader && this.router.url.indexOf('dashboard') <= -1) {
      this.loaderService.show();
    }
    if (!isTokenRequired) {
      this.timer = req.url.indexOf('maprvolume') <= -1 ? 60000 : 80000;
      const currentUser = this.utilityService.getCurrentUser();
      req = req.clone({
        setHeaders: {
          token: currentUser.token,
          user_id: currentUser.user_id,
          nm_role: currentUser.role,
          group: currentUser.group
        }
      });
    }
    return next
      .handle(req)
      .timeoutWith(
        this.timer,
        Observable.throw(new Error(`${req.url}: timeout error!`))
      )
      .do(event => {
        if (event instanceof HttpResponse) {
          if (!isTokenRequired && !event.body.valid) {
            this.router.navigate(['/login']);
            this.alertService.onNotify(true);
          }
        }
      })
      .catch((error, caught) => {
        this.loaderService.hide();
        return Observable.throw(error);
      })
      .finally(() => {
        if (this.router.url.indexOf('dashboard') <= -1) {
          this.loaderService.hide();
        }
      }) as any;
  }
}
