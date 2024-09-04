import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

const map = new Map({
  target: 'map',
  controls: [],
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

document.querySelector('#close-banner').addEventListener('click', (event) => {
    document.querySelector('[slot="banner"]').remove();
  });
