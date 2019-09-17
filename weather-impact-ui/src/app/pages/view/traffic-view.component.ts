import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { MapService } from '../../_services/map.service';
import { Map } from '../../common/map/Map';
import * as mapboxgl from 'mapbox-gl';
import { UtilityService } from '../../_services/utility.service';
import { StrapiService } from '../../_services/strapi.service';
import { Subject } from 'rxjs/Subject';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-nsc-global-view',
  templateUrl: './traffic-view.component.html',
  styleUrls: ['./traffic-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NscGlobalViewComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  showSideBarMapVol: boolean;
  showSideBarMapDeployment: boolean;
  interval: number;
  alternateRoute = true;
  rainFall: boolean;

  constructor(
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private utilityService: UtilityService,
    private strapiService: StrapiService,
    private messageService: MessageService,
  ) {}
  map: any;
  features: any;
  showSideBarMapVolumes: boolean;
  showSideBarMapDeployments: boolean;
  currentMarker;
  volumes: any;
  deployments: any;
  cols: any;
  colsMap: any;
  value: number;
  syncedVols: any[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {
    this.map = new Map();
    this.map.init();
    this.mapService.mapInstance = this.map;
    this.features = [...this.mapService.mapData];
    this.map.buildMap(this.features);
    // this.map.showConnections(this.utilityService.getColos());
    this.features.forEach((marker, i) => {
      const nativeElement = this.mapService.createMarkers(marker, i, 'global');
      this.map.addMarkers(nativeElement, marker);
    });
    // listening for displaying tables
    this.mapService.sub.takeUntil(this.destroy$).subscribe(res => {
      if (res.type) {
        this.currentMarker = res.marker;
        this.strapiService.locationSpecificVolumes(
          res.marker.properties.name
        ).subscribe(vols => this.volumes = vols);
        this.deployments = this.utilityService.locationSpecificDeployments(
          res.marker.properties.name
        );
      } else {
        this.showSideBarMapDeployments = false;
        this.showSideBarMapVolumes = false;
      }
    });
    this.interval = setTimeout(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
        this.value = 100;
      }
      this.strapiService.getRoute(
        ).subscribe(data => {
          this.map.showRoute(data);
        });
    }, 1000);
    setTimeout(() => {
      this.strapiService.getRoute(
        ).subscribe(data => {
          this.map.showRoute(data);
        });
        this.rainFall = true;
        this.alternateRoute = true;
    }, 25000);
    setTimeout(() => {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Service Message',
        detail:
        `Heavy rain predicted. New route suggestion is ready.`
      });
      this.strapiService.getDifferentRoute(
        ).subscribe(data => {
          this.map.showDifferentRoute(data);
        });
        this.rainFall = true;
        this.alternateRoute = false;
    }, 30000);
  }
  resetValue(e) {
    this.value = 0;
    const vols = [...e.data.clusters];
    const index = vols.indexOf(this.currentMarker.properties.name);
    vols.splice(index, 1);
    this.syncedVols = vols;
  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
