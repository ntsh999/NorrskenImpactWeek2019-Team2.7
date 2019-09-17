import * as mapboxgl from 'mapbox-gl';
export declare class Map {
  init();
  buildMap();
  createClusters();
  getMapInstance();
  createLine();
  flyToLocation(marker);
  removeLayer(flat);
  addMarkers(element, marker);
  showConnections(colos);
  resetZoom();
  showRoute(data);
  showDifferentRoute(data);
}
