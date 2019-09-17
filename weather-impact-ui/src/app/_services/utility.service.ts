import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { COLOSCOORDINATES } from '../config/colos.coordinates';
import * as _ from 'lodash';

@Injectable()
export class UtilityService {
  public globalRegionValue = 'Stockholm';
  public globalRegionSubject = new Subject<any>();
  private volumes: any;
  private deployments: any;
  private catalogs: any;
  sharedVolumes: any;
  private sharedCatalogs: any;
  private colos: any;
  private groups: string[];
  private requests: any[];
  constructor() {
    this.colos = COLOSCOORDINATES;
  }
  // getVolumes() {
  //   return [...this.volumes];
  // }
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
  setCurrentUser(userDetails) {
    sessionStorage.setItem('currentUser', userDetails);
  }
  removeCurrentUser() {
    sessionStorage.removeItem('currentUser');
  }
  get globalRegion() {
    return this.globalRegionSubject.asObservable();
  }
  addSharedService(service) {
    console.log(service);
    this.sharedCatalogs.push(service);
  }
  updateCatlogService(service) {
    const index = _.findIndex(this.catalogs, {name:  service.name});
    this.catalogs[index] = service;
  }
  addSharedVolume(volume) {
    this.sharedVolumes.push(volume);
  }

  addRequest(request) {
    return this.requests.push(request);
  }
  addVolume(volume) {
    console.log(volume);
    this.volumes.push(volume);
  }
  getCatalogs() {
    return [...this.catalogs];
  }
  getSharedVolumes() {
    return [...this.sharedVolumes];
  }
  addDeployment(deployment) {
    console.log(JSON.stringify(this.deployments));
    this.deployments.push(deployment);
    console.log(JSON.stringify(this.deployments));
  }
  locationSpecificDeployments(location) {
    return _.filter(this.deployments, (i, index) => {
      return i.clusters.includes(location);
    });
  }

  updateGlobalRegion(marker) {
    this.globalRegionValue = marker.properties.name;
    this.globalRegionSubject.next(marker);
  }

  toArrayOfObject(arr) {
    const tempArr = [];
    for (let i = 0; i < arr.length; ++i) {
      const obj = {};
      if (arr[i] !== undefined) {
        obj['label'] = arr[i];
        obj['value'] = arr[i];
      }
      tempArr.push(obj);
    }
    return tempArr;
  }
}
