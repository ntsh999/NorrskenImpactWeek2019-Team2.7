import { Injectable, ComponentFactoryResolver, ComponentRef, ComponentFactory, Injector, ApplicationRef } from '@angular/core';
// import { environment } from '../../environments/environment';

// import { GeoJson } from '../common/map/map';
import * as mapboxgl from 'mapbox-gl';
import { MapPopoverComponent } from '../common/map/map-popover/map-popover.component';
import { Map } from '../common/map/Map';
import { Subject, Observable } from 'rxjs';
import { LOCATIONLIST } from '../config/locations';
import * as _ from 'lodash';

@Injectable()
export class MapService {
  map: any;
  geoJSON: any;
  themes: any;
  loadedTheme: any;
  lineColors: any;
  mapCenter: number[];
  mapInstance: mapboxgl.Map;
  mapData: any[];
  public sub = new Subject<any>();
  private markerClickSubject = new Subject<any>();
  private componentRef: any;
  volumes: any;
  constructor(private resolver: ComponentFactoryResolver,  private injector: Injector, private appRef: ApplicationRef) {
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    this.mapData = LOCATIONLIST;
  }
  getMapInstance() {
    return this.map;
  }
  createClusters() {
    this.map.addSource('cluster', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: this.geoJSON,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'cluster',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          10,
          '#f1f075',
          15,
          '#36B07F',
          20,
          '#A56EBE'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          10,
          10,
          20,
          15,
          25,
          20,
          30
        ]
      }
    });
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'cluster',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });
    const bounds = new mapboxgl.LngLatBounds();

    this.geoJSON.features.forEach(function(feature) {
      bounds.extend(feature.geometry.coordinates);
    });

    this.map.fitBounds(bounds);
  }

  createMarkers(marker: any, i: number, type: string) {
    const factory = this.resolver.resolveComponentFactory(MapPopoverComponent);
    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.marker = marker;
    this.componentRef.instance.index = i;
    this.componentRef.instance.type = type;
    this.componentRef.changeDetectorRef.detectChanges();
    this.appRef.attachView(this.componentRef.hostView);
    this.componentRef.instance.output.subscribe(res => {
      this.mapInstance.flyToLocation(res);
      this.markerClickSubject.next(res);
      // hiding previous opened table
      this.sub.next(false);
    });
    this.componentRef.instance.outputLine.subscribe(event => this.mapInstance.dataTransfer(marker));
    this.componentRef.instance.removeLayer.subscribe(event => this.mapInstance.removeLayer(event));
    this.componentRef.instance.openSideBar.subscribe((obj) => { this.sub.next(obj); });

    this.componentRef.onDestroy(() => {
      this.appRef.detachView(this.componentRef.hostView);
    });

   return this.componentRef.location.nativeElement;
    // this.componentRef.instance.output.subscribe(event => console.log(event));
  }
  showSiteDetails(marker) {
    this.mapInstance.flyToLocation(marker);
    this.markerClickSubject.next(marker);
  }
  get markerClickObservable(): Observable<any> {
    return this.markerClickSubject;
  }
  showDataTransfer(marker) {
    this.mapInstance.dataTransfer(marker);
  }
  showSvcProvider(e) {
    const currentLocation = document.querySelector('#' + e.target.id);
    const siblings = this.getSiblings(currentLocation);
    const entireList = document.querySelectorAll('.svc-provider-container li');
    for (let i = 0; i < entireList.length; i++) {
      if (!entireList[i].classList.contains('circle-ripple')) {
        entireList[i].classList.add('fadeOut');
        entireList[i].classList.remove('fadeIn');
      } else {
        entireList[i].classList.remove('active');
      }
    }
    if (currentLocation.classList.contains('active')) {
      siblings.forEach((svc, i) => {
        svc.classList.remove('fadeIn');
        svc.classList.add('fadeOut');
      });
      currentLocation.classList.remove('active');
    } else {
      siblings.forEach((svc, i) => {
        svc.classList.remove('fadeOut');
        svc.classList.add('animated', 'fadeIn');
      });
      currentLocation.classList.add('active');
    }
    e.stopPropagation();
  }
  getSiblings(elem) {
    // Setup siblings array and get the first sibling
    const siblings = [];
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // add markers to this.map
  addMarkers(nativeElement, marker) {
    this.map.addMarkers(nativeElement, marker);
  }
  flyToLocation(currentFeature) {
   this.mapInstance.flyToLocation(currentFeature);
  }
  buildMap(featuresList) {
    this.buildMap(featuresList);
  }
}
