import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import dot from '../../../assets/images/dot.png';
export class Map {
  init() {
    var loadedTheme = document.querySelector('body').classList;

    var themes = {
      dark: 'mapbox/dark-v9',
      light: 'daniel-ericsson/cjhknwseq0dk22rnzpgqciiah'
    };

    // dark: 'daniel-ericsson/cjhknw7b62bai2srw84r730uw',
    // light: 'daniel-ericsson/cjhknwseq0dk22rnzpgqciiah',

    var lineColors = {
      dark: '#F2F2F2',
      light: '#242424'
    };
    var mapCenter = [-0.3817841, 51.528308];
    var mapBoundaries = {
      topLeft: [17.92821, 59.34554],
      bottomRight: [18.09953, 59.31703]
    };

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFuaWVsLWVyaWNzc29uIiwiYSI6ImNqZnh3cng0NTEzZTcyd2tkYWJhOGN3czIifQ.Nyg8nQf7s8nqW81xcL2hwg';

    const mq = window.innerWidth;
    let zoomLevel = 0;
    if (mq > 1500) {
      zoomLevel = 1.5;
    }
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/' + themes[loadedTheme],
      zoom: zoomLevel,
      minZoom: 1,
      dragRotate: false,
      center: mapCenter
    });
    // Add zoom and rotation controls to the this.map.
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  showRoute(data) {
    let color ='#0082f0' 
    if (this.map.getLayer('driveRoute')) {
      this.map.removeLayer('driveRoute');
      this.map.removeSource('driveRoute');
      color = '#8B0000';
    }
    this.map.addLayer({
      id: 'driveRoute',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: data.routes[0].geometry,
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': color,
        'line-width': 4,
      },
    });
    color = '#0fc373';
  }
  showDifferentRoute(data) {
    let color ='#0082f0' 
    if (this.map.getLayer('driveRoute')) {
      this.map.removeLayer('driveRoute');
      this.map.removeSource('driveRoute');
      color = '#8B0000';
    }
    this.map.addLayer({
      id: 'driveRoute',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: data.routes[0].geometry,
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#0fc373',
        'line-width': 4,
      },
    });
  }
  getDirection() {
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: data.routes[0].geometry,
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ff7e5f',
        'line-width': 8,
      },
    })
  
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
    var bounds = new mapboxgl.LngLatBounds();

    this.geoJSON.features.forEach(function(feature) {
      bounds.extend(feature.geometry.coordinates);
    });

    this.map.fitBounds(bounds);
  }
  resetZoom() {
    this.map.zoomTo(1);
  }
  createLine() {
    var geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      ]
    };

    var startPoint = [0.108266, 52.202758];
    var endPoint = [0.11556, 52.201733];

    var framesPerSecond = 20;
    var initialOpacity = 1;
    var opacity = initialOpacity;
    var initialRadius = 4;
    var radius = initialRadius;
    var maxRadius = 15;

    var speedFactor = 100; // number of frames per longitude degree
    var animation; // to store and cancel the animation
    this.map.addSource('point1', {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: [startPoint[0], startPoint[1]]
      }
    });
    this.map.addLayer({
      id: 'circle1',
      source: 'point1',
      type: 'circle',
      paint: {
        'circle-radius': initialRadius,
        'circle-radius-transition': {
          duration: 0
        },
        'circle-opacity-transition': {
          duration: 0
        },
        'circle-color': '#007cbf'
      }
    });
    this.map.addLayer({
      id: 'point1',
      source: 'point1',
      type: 'circle',
      paint: {
        'circle-radius': initialRadius,
        'circle-color': '#007cbf'
      }
    });

    // Point 2
    this.map.addSource('point2', {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: [endPoint[0], endPoint[1]]
      }
    });
    this.map.addLayer({
      id: 'circle2',
      source: 'point2',
      type: 'circle',
      paint: {
        'circle-radius': initialRadius,
        'circle-radius-transition': {
          duration: 0
        },
        'circle-opacity-transition': {
          duration: 0
        },
        'circle-color': '#007cbf'
      }
    });
    this.map.addLayer({
      id: 'point2',
      source: 'point2',
      type: 'circle',
      paint: {
        'circle-radius': initialRadius,
        'circle-color': '#007cbf'
      }
    });

    //Line
    this.map.addLayer({
      id: 'line-animation',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#ffffff',
        'line-width': 2
      }
    });

    var diffX = endPoint[0] - startPoint[0];
    var diffY = endPoint[1] - startPoint[1];

    var sfX = diffX / speedFactor;
    var sfY = diffY / speedFactor;

    var i = 0;
    var j = 0;

    var lineCoordinates = [];

    while (i < diffX || Math.abs(j) < Math.abs(diffY)) {
      lineCoordinates.push([startPoint[0] + i, startPoint[1] + j]);

      if (i < diffX) {
        i += sfX;
      }

      if (Math.abs(j) < Math.abs(diffY)) {
        j += sfY;
      }
    }
    animateLine();
  }

  animateLine() {
    var animationCounter = 0;
    if (animationCounter < lineCoordinates.length) {
      geojson.features[0].geometry.coordinates.push(
        lineCoordinates[animationCounter]
      );
      this.map.getSource('line-animation').setData(this.geoJSON);

      requestAnimationFrame(animateLine);
      animationCounter++;
    } else {
      var coord = geojson.features[0].geometry.coordinates;
      coord.shift();

      if (coord.length > 0) {
        this.geoJSON.features[0].geometry.coordinates = coord;
        this.map.getSource('line-animation').setData(this.geoJSON);
        //-------------- Point2 Animation End ---------------
        requestAnimationFrame(animateLine);
      }
    }
  }
  showSvcProvider(e) {
    var currentLocation = document.querySelector('#' + e.target.id);
    var siblings = this.getSiblings(currentLocation);
    var entireList = document.querySelectorAll('.svc-provider-container li');
    for (var i = 0; i < entireList.length; i++) {
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
    var siblings = [];
    var sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content;
  }

  popupTemplate(direction, space, usage, coordinates) {
    var content = this.htmlToElements(`
    <div class="controls">
    <button class="default-small-btn"><i class="icon icon-edit"></i></button>
    <button class="default-small-btn"><i class="icon icon-copy"></i></button>
    <button class="default-small-btn"><i class="icon icon-trashcan"></i></button>
</div>
    `);
    //var buttons = content.childNodes;
    // console.log(content.childNodes);
    // var buttons = document.querySelectorAll(".controls button");
    // for (let i = 0; i < buttons.length; i++) {
    //     buttons[i].addEventListener('click', () => {
    //       this.getRandomInt();
    //     }, false);
    // }

    return `<div class="popup-container message ${direction} black">
    <div class="volume-stats">
      <div class="volume-name">Test Volume</div>
      <div class="space">
        <span class="label">Total-size</span> <span>${space} G</span>
        <div class="progress-bar purple thin">
          <span class="label">Usage</span>
          <progress value="${usage}" max="100"></progress>
          <span>${usage}%</span>
        </div>
      </div>
      <div class="controls">
      ${content.firstChild.innerHTML}
      </div>
    </div>
  </div>`;
  }

  getRandomInt(max) {
    console.log('hi');
    return Math.floor(Math.random() * Math.floor(max));
  }

  showConnections(colos) {
    // A simple line from origin to destination.
    this.map.on('style.load', () => {
      var colosConnections = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Stockholm'], colos['London']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Stockholm'], colos['Frankfurt']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['London'], colos['Frankfurt']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['London'], colos['Ashburn']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Ashburn'], colos['San Jose']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Ashburn'], colos['Miami']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Frankfurt'], colos['Hongkong']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Frankfurt'], colos['Singapore']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Singapore'], colos['Hongkong']]
            }
          },
          // {
          //   type: 'Feature',
          //   geometry: {
          //     type: 'LineString',
          //     coordinates: [colos['San Jose'], colos['Hongkong']]
          //   }
          // },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['San Jose'], colos['Miami']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              // Object.values(this.map.unproject([0, document.getElementById('map').clientHeight/2.2 + 2]))
              coordinates: [ Object.values(this.map.unproject([50, document.getElementById('map').clientHeight/2.35])), colos['San Jose']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              // Object.values(this.map.unproject([document.getElementById('map').clientWidth, document.getElementById('map').clientHeight/2.2 +2]))
              coordinates: [colos['Hongkong'], Object.values(this.map.unproject([document.getElementById('map').clientWidth - 50, document.getElementById('map').clientHeight/2.35]))]
            }
          }
        ]
      };
      var customerSiteConnections = {
        type: 'FeatureCollection',
        features: [
          // {
          //   type: 'Feature',
          //   geometry: {
          //     type: 'LineString',
          //     coordinates: [colos['Chennai'], colos['Singapore']]
          //   }
          // },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Tallinn'], colos['Stockholm']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Tallinn'], colos['Frankfurt']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Dallas'], colos['San Jose']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Ashburn'], colos['Dallas']]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Beijing'], colos['Hongkong']]
            }
          },
          // {
          //   type: 'Feature',
          //   geometry: {
          //     type: 'LineString',
          //     coordinates: [colos['Naypidaw'], colos['Singapore']]
          //   }
          // },
          // {
          //   type: 'Feature',
          //   geometry: {
          //     type: 'LineString',
          //     coordinates: [colos['Hokkaido'], colos['Hongkong']]
          //   }
          // },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [colos['Miami'], colos['Brazil']]
            }
          }
        ]
      };

      // for (let i = 0; i < connections.features.length; i++) {
      //   var lineDistance = turf.lineDistance(connections.features[i], {
      //     units: 'kilometers'
      //   });
      //   var arc = [];
      //   // Number of steps to use in the arc and animation, more steps means
      //   // a smoother arc and animation, but too many steps will result in a
      //   // low frame rate
      //   var steps = 500;
      //   // Draw an arc between the `origin` & `destination` of the two points
      //   for (let j = 0; j < lineDistance; j += lineDistance / steps) {
      //     var segment = turf.along(connections.features[i], j, { units: 'kilometers' });
      //     arc.push(segment.geometry.coordinates);
      //   }
      //   // Update the route with calculated arc coordinates
      //   connections.features[i].geometry.coordinates = arc;
      // }

      this.map.addSource('colosConnections', {
        type: 'geojson',
        data: colosConnections
      });

      this.map.addLayer({
        id: 'colosConnections',
        source: 'colosConnections',
        type: 'line',
        paint: {
          'line-width': 1,
          'line-color': '#c8c8c8'
        }
      });

      this.map.addSource('customerSiteConnections', {
        type: 'geojson',
        data: customerSiteConnections
      });

      this.map.addLayer({
        id: 'customerSiteConnections',
        source: 'customerSiteConnections',
        type: 'line',
        paint: {
          'line-width': 1,
          'line-color': '#c8c8c8',
          'line-dasharray': [2, 2]
        }
      });
    });
  }

  dataTransfer(marker) {
    var origin = marker.geometry.coordinates;
    var destination = [114.109497, 22.396427];
    var bounds = new mapboxgl.LngLatBounds();
    bounds.extend(origin);
    bounds.extend(destination);
    this.map.fitBounds(bounds);
    // A simple line from origin to destination.
    var route = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [origin, destination]
          }
        }
      ]
    };

    // this.map.addImage('dot', pulsingDot, { pixelRatio: 2 });
    this.map.loadImage('../../../assets/images/dot.png', (error, image) => {
      if (error) throw error;
      this.map.addImage('dot', image);
    });

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    var point = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: origin
          }
        }
      ]
    };

    this.removeLayer();
    // Calculate the distance in kilometers between route start/end point.

    var lineDistance = turf.lineDistance(route.features[0], {
      units: 'kilometers'
    });
    console.log(lineDistance);

    var arc = [];

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    var steps = 500;

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i += lineDistance / steps) {
      var segment = turf.along(route.features[0], i, { units: 'kilometers' });
      arc.push(segment.geometry.coordinates);
    }

    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    // Used to increment the value of the point measurement against the route.
    this.counter = 0;

    // Add a source and layer displaying a point which will be animated in a circle.
    this.map.addSource('route', {
      type: 'geojson',
      data: route
    });

    this.map.addSource('point', {
      type: 'geojson',
      data: point
    });

    this.map.addLayer({
      id: 'route',
      source: 'route',
      type: 'line',
      paint: {
        'line-width': 2,
        'line-color': '#007cbf'
      }
    });

    this.map.addLayer({
      id: 'point',
      source: 'point',
      type: 'symbol',
      layout: {
        'icon-image': 'dot',
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true
      }
    });
    this.map.zoomTo(1);
    animate.call(this);

    function animate() {
      // Update point geometry to a new position based on counter denoting
      // the index to access the arc.
      point.features[0].geometry.coordinates =
        route.features[0].geometry.coordinates[this.counter];

      // Calculate the bearing to ensure the icon is rotated to match the route arc
      // The bearing is calculate between the current point and the next point, except
      // at the end of the arc use the previous point and the current point
      point.features[0].properties.bearing = turf.bearing(
        turf.point(
          route.features[0].geometry.coordinates[
            this.counter >= steps ? this.counter - 1 : this.counter
          ]
        ),
        turf.point(
          route.features[0].geometry.coordinates[
            this.counter >= steps ? this.counter : this.counter + 1
          ]
        )
      );

      // Update the source with this new data.
      this.map.getSource('point').setData(point);

      // Request the next frame of animation so long the end has not been reached.
      if (this.counter < steps) {
        this.counter = this.counter + 1;
        window.requestAnimationFrame(animate.bind(this));
      }
    }
  }

  removeLayer(flag) {
    if (this.map.getSource('point') && this.map.getSource('route')) {
      this.map.removeLayer('route');
      this.map.removeLayer('point');
      this.map.removeSource('route');
      this.map.removeSource('point');
    }
  }

  oldAddMarkers(marker) {
    // this.geoJSON.features.forEach((marker, i) => {
    //   // create a HTML element for each feature
    //   var el = document.createElement('div');
    //   console.log(el);
    //   // if (marker.geometry.type != undefined) {
    //   var svcProvider = marker.properties.providers;
    //   var svcProviderContainer = document.createElement('div');
    //   svcProviderContainer.className = 'svc-provider-container';
    //   var markers = document.createElement('UL');
    //   svcProviderContainer.appendChild(markers);
    //   var popupDirections = ['top', 'right', 'left', 'bottom'];
    //   for (let i = 0; i < svcProvider.length; i++) {
    //     let li = document.createElement('li');
    //     let a = document.createElement('a');
    //     li.appendChild(a);
    //     li.className = 'tooltip';
    //     var popupHTMLString = this.popupTemplate(
    //       popupDirections[i],
    //       this.getRandomInt(50),
    //       this.getRandomInt(100),
    //       marker.geometry.coordinates
    //     );
    //     // li.appendChild(popupHTMLString);
    //     var buttons = document.querySelectorAll('.controls button');
    //     for (let i = 0; i < buttons.length; i++) {
    //       buttons[i].addEventListener(
    //         'click',
    //         e => {
    //           e.stopPropagation();
    //           this.dataTransfer(marker);
    //         },
    //         false
    //       );
    //     }
    //     li.insertAdjacentHTML('beforeend', popupHTMLString);
    //     a.className = svcProvider[i];
    //     markers.appendChild(li);
    //     li.addEventListener(
    //       'mouseover',
    //       () => {
    //         var popUps = document.getElementsByClassName('visible');
    //         // Check if there is already a popup on the map and if so, remove it
    //         if (popUps[0]) popUps[0].classList.remove('visible');
    //         var messageElement = li.querySelector('.message');
    //         messageElement.classList.add('visible');
    //       },
    //       false
    //     );
    //   }
    //   var lastLi = this.htmlToElements(
    //     `<li class="circle-ripple small orange" id="mId${i}" site-color="green" />`
    //   );
    //   lastLi.firstChild.addEventListener(
    //     'click',
    //     event => {
    //       this.showSvcProvider(event);
    //       this.flyToLocation(marker);
    //     },
    //     false
    //   );
    //   markers.appendChild(lastLi.firstChild);
    //   // markers.insertAdjacentHTML( 'beforeend', `<li class="circle-ripple small orange" id="mId${i}" site-color="green" />` );
    //   // var popup = document.createElement('app-map-popover');
    //   el.appendChild(svcProviderContainer);
    //   // el.appendChild(popup);
    //   // make a marker for each feature and add to the this.map
    //   // el.addEventListener('click', (event) => {
    //   //   this.showSvcProvider(event);
    //   //   this.flyToLocation(marker);
    //   // }, false);
    //   new mapboxgl.Marker(el)
    //     .setLngLat(marker.geometry.coordinates)
    //     .addTo(this.map);
    // });
  }
  // add markers to this.map
  addMarkers(domEle, marker) {
    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );
    var el = document.createElement('div');
    el.appendChild(domEle);
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(this.map);
  }
  flyToLocation(currentFeature) {
    this.map.flyTo({
      zoom: 3,
      center: currentFeature.geometry.coordinates
    });
  }
  buildMap(featuresList) {
    // data points
    this.geoJSON = {
      type: 'FeatureCollection',
      features: featuresList
    };

    var bounds = new mapboxgl.LngLatBounds();

    this.geoJSON.features.forEach(function(feature) {
      bounds.extend(feature.geometry.coordinates);
    });
    this.map.fitBounds(bounds, {padding: 100});
    this.lastZoom = this.map.getZoom();
    // this.map.on('zoom', (e) => {
    //   if( this.map.getZoom() < this.lastZoom) {
    //     this.map.fitBounds(bounds, {padding: 100});
    //   }
    //  this.lastZoom = this.map.getZoom();
    // });
    this.map.on('click', e => {
      console.log('on click', e);
    });

    document.addEventListener(
      'maximizeTile',
      event => {
        setTimeout(() => {
          this.map.resize();
          this.map.flyTo({ center: mapCenter });
        }, 600);
      },
      false
    );

    document.addEventListener(
      'minimizeTile',
      event => {
        setTimeout(() => {
          this.map.resize();
          this.map.flyTo({ center: mapCenter });
        }, 600);
      },
      false
    );

    document.addEventListener(
      'toggleNavigation',
      event => {
        setTimeout(() => {
          this.map.resize();
          this.map.flyTo({ center: mapCenter });
        }, 600);
      },
      false
    );

    document.addEventListener(
      'switchTheme',
      event => {
        loadedTheme = event.detail.theme;
        this.map.setStyle('mapbox://styles/' + themes[loadedTheme]);
        this.map.on('style.load', () => {
          lines.paint['line-color'] = lineColors[loadedTheme];
          if (!this.map.getLayer(lines.id)) {
            this.map.addLayer(lines);
          } else {
            this.map.setPaintProperty(
              lines.id,
              'line-color',
              lineColors[loadedTheme]
            );
          }
        });
      },
      false
    );
  }
}
