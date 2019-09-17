import { COLOSCOORDINATES } from './colos.coordinates';
export const LOCATIONLIST = [
  {
    type: 'Feature',
    properties: {
      name: 'origin'
    },
    geometry: {
      type: 'Point',
      coordinates: COLOSCOORDINATES['Stockholm']
    }
  },
  {
    type: 'Feature',
    properties: {
     site: 'destination'
    },
    geometry: {
      type: 'Point',
      coordinates: COLOSCOORDINATES['Gothenburg']
    }
  }
];
