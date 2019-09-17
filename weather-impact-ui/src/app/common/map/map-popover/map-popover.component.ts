import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  DoCheck,
  ChangeDetectorRef,
  AfterViewInit,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core';
import { Map } from '../Map';
import * as mapboxgl from 'mapbox-gl';
import * as _ from 'lodash';
import { UtilityService } from '../../../_services/utility.service';
import { StrapiService } from '../../../_services/strapi.service';

@Component({
  selector: 'app-map-popover',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.scss']
})
export class MapPopoverComponent implements OnInit {
  private svcProvider;
  @Input() marker: any;
  @Input() map: mapboxgl.Map;
  selectedLocation: string;
  type: string;
  @Input() index: any;
  @Output() output = new EventEmitter();
  @Output() outputLine = new EventEmitter();
  @Output() removeLayer = new EventEmitter();
  @Output() openSideBar = new EventEmitter();
  currentMarkerPopups: any;

  @ViewChild('popup') popup: ElementRef;
  fadeStatus: boolean;
  cars: any;
  private popupDirections = ['top', 'right', 'left', 'bottom'];
  volumesCount: number;
  deploymentsCount: number;
  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private utiltiyService: UtilityService,
    private strapiSerivce: StrapiService
  ) {
    this.selectedLocation = this.utiltiyService.globalRegionValue;
    this.utiltiyService.globalRegionSubject.subscribe(marker => {
      const popUps = document.getElementsByClassName('tooltip');
      // Check if there is already a popup on the map and if so, remove it
      _.forEach(popUps, popUp => {
        popUp.classList.remove('visible');
        popUp.classList.add('hide');
      });
      this.selectedLocation = marker.properties.name;
    });
  }

  showDataTransfer() {
    this.fadeStatus = false;
    this.currentMarkerPopups.classList.remove('visible');
    this.outputLine.emit();
  }
  ngOnInit() {}
  showTable(e, type) {
    e.stopImmediatePropagation();
    this.fadeStatus = false;
    this.openSideBar.emit({ marker: this.marker, type: type });
  }
  showSvcProvider(e) {
    this.fadeStatus = true;
    this.strapiSerivce
      .locationSpecificVolumes(this.marker.properties.name)
      .subscribe(res => {
        this.volumesCount = res.length;
        const popUps = document.getElementsByClassName('tooltip');
        this.removeLayer.emit(true);
        // Check if there is already a popup on the map and if so, remove it
        _.forEach(popUps, popUp => {
          popUp.classList.remove('visible');
          popUp.classList.add('hide');
        });
        this.currentMarkerPopups = e.target.querySelectorAll('.tooltip');
        _.forEach(this.currentMarkerPopups, popup => {
          popup.classList.add('visible');
          popup.classList.remove('hide');
        });
      });
    this.deploymentsCount = this.utiltiyService.locationSpecificDeployments(
      this.marker.properties.name
    ).length;
    e.stopImmediatePropagation();
    this.output.emit(this.marker);
  }
}
