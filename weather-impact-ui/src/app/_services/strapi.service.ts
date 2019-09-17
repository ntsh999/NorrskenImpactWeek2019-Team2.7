import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class StrapiService {
  apiURL: string =
  // 'https://153.88.12.14:30932/';
  'https://nsc-registry.infra.ericsson.se:30123/';
  constructor(private _HttpClient: HttpClient) { }
  getFaqs(keywords) {
    let params = new HttpParams();
    if (keywords) {
      params = params.append('question_contains', keywords);
      params = params.append('answer_contains', keywords);
    }
    return this._HttpClient.get<any>(this.apiURL + 'faqs', {params: params});
  }
  getVolumes() {
    return this._HttpClient.get<any>(this.apiURL + 'demovolumes',  {params: undefined});
  }
  getRoute() {
    let params = new HttpParams();
    // https://api.mapbox.com/directions/v5/mapbox/driving/18.0944238,42.65066059999999;15.981919,45.8150108?access_token=${mapboxgl.accessToken}&geometries=geojson
      params = params.append('access_token',
       'pk.eyJ1IjoiZGFuaWVsLWVyaWNzc29uIiwiYSI6ImNqZnh3cng0NTEzZTcyd2tkYWJhOGN3czIifQ.Nyg8nQf7s8nqW81xcL2hwg');
      params = params.append('geometries', 'geojson');
    return this._HttpClient.get<any>(
      'https://api.mapbox.com/directions/v5/mapbox/driving/18.062014,59.3414299;17.8761256,59.4157373', {params: params});
  }
  getDifferentRoute() {
    let params = new HttpParams();
    // https://api.mapbox.com/directions/v5/mapbox/driving/18.0944238,42.65066059999999;15.981919,45.8150108?access_token=${mapboxgl.accessToken}&geometries=geojson
      params = params.append('access_token',
       'pk.eyJ1IjoiZGFuaWVsLWVyaWNzc29uIiwiYSI6ImNqZnh3cng0NTEzZTcyd2tkYWJhOGN3czIifQ.Nyg8nQf7s8nqW81xcL2hwg');
      params = params.append('geometries', 'geojson');
    return this._HttpClient.get<any>(
      'https://api.mapbox.com/directions/v5/mapbox/cycling/18.062014,59.3414299;17.8761256,59.4157373', {params: params});
  }
  addVolume(volume) {
    console.log(volume);
    return this._HttpClient.post<any>(this.apiURL + 'demovolumes', volume);
    // this.volumes.push(volume);
  }
  addVolumeToCatalog(volume) {
    return this._HttpClient.put<any>(this.apiURL + `demovolumes/${volume.id}`, {clusters: volume.clusters });
  }
    updateCatalogVolume(volume) {
    return this._HttpClient.put<any>(this.apiURL + `demovolumes/${volume.id}`, {shared: true});
  }
  locationSpecificVolumes(location) {
    let params = new HttpParams();
    if (location) {
      params = params.append('clusters_contains', location);
    }
    return this._HttpClient.get<any>(this.apiURL + 'demovolumes', {params: params});
  }
  getStatus(currentCount) {
    let params = new HttpParams();
    if (currentCount) {
      params = params.append('_start', '0');
      params = params.append('_limit', '3');
    }
    params = params.append('_sort', 'createdAt:desc');
    // params = params.append('_start', currentCount);
    // params = params.append('_limit', '10');
    return this._HttpClient.get<any>(this.apiURL + 'statuses', {params: params});
  }
  getStatusDetails(id) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this._HttpClient.get<any>(this.apiURL + 'statusdetails', {params: params}).map((data: any[]) => data[0]);
  }
  getNews(currentCount) {
    let params = new HttpParams();
    if (currentCount) {
      params = params.append('_start', '0');
      params = params.append('_limit', '3');
    }
    params = params.append('_sort', 'date:DESC');
    return this._HttpClient.get<any>(this.apiURL + 'news', {params: params});
  }
}
