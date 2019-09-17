import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  OnChanges
} from '@angular/core';
import { MapService } from '../../../_services/map.service';
import * as _ from 'lodash';
import { StrapiService } from '../../../_services/strapi.service';
import { UtilityService } from '../../../_services/utility.service';

export interface IGeometry {
  type: string;
  coordinates: number[];
}
export interface IGeoJson {
  type?: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}
@Component({
  selector: 'app-map-stats',
  templateUrl: './map-stats.component.html',
  styleUrls: ['./map-stats.component.scss']
})
export class MapStatsComponent implements OnInit, OnChanges {
  @Input() globalView: boolean;
  @Input() rainView: boolean;
  marker: IGeoJson;
  private speed: any = '40 Km/hr';
  private time: any = '10 minutes';
  private globalVolumesCount = 0;
  private fuel = 'x';
  private carbon = 'x';
  private selectedLocation: string;
  @ViewChild('statsContainer') container: ElementRef;
  constructor(
    private mapService: MapService,
    private strapiService: StrapiService,
    private renderer: Renderer2,
    private utilityService: UtilityService
  ) {}
  ngOnChanges() {
    if (this.globalView && this.rainView) {
      this.speed = '20 km/hr';
      this.fuel = 'x + 10% more';
      this.carbon = 'x + 33% more';
      this.time = '30 minutes';
    }
    if (!this.globalView && this.rainView) {
      this.speed = '30 km/hr';
      this.fuel = 'x + 2%';
      this.carbon = 'x + 5%';
      this.time = '15 minutes';
    }
  }
  ngOnInit() {
    this.selectedLocation = this.utilityService.globalRegionValue;
  }
}
