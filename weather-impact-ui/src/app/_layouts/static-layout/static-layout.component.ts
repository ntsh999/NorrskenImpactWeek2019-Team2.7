import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  UrlSegment,
  NavigationStart
} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-static-layout',
  templateUrl: './static-layout.component.html',
  styleUrls: ['./static-layout.component.scss']
})
export class StaticLayoutComponent implements OnInit {
  userName: string;
  currentRoute: string;
  showHeroComponent = 'show';
  content: string;
  notificationFlag = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // this.notificationFlag = true;
    // this.fetchOutageData();
  }
}
