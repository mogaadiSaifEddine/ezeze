import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;

  lat = 26.3398;
  lng = -81.7787;
  constructor() {}

  ngOnInit() {
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZHBpZXRyb2NhcmxvIiwiYSI6ImNram9tOGFuMTBvb3oyeXFsdW5uYmJjNGQifQ._zE6Mub0-Vpl7ggMj8xSUQ',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [9.7808908, 37.1474345],
      zoom: 13,
      attributionControl: false
    });
    this.map;

    const marker1 = new mapboxgl.Marker().setLngLat([9.7808908, 37.1474345]).addTo(this.map);
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    /*
    this.map.on('load', () => {
      this.map.addSource('radar', {
        type: 'image',
        url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        coordinates: [
          [-80.425, 46.437],
          [-71.516, 46.437],
          [-71.516, 37.936],
          [-80.425, 37.936],
        ],
      });
      this.map.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
        },
      });
            

    });
    */

    const southWest = new mapboxgl.LngLat(this.lng, this.lat);
    const northEast = new mapboxgl.LngLat(this.lng + 2, this.lat + 2);
    const boundingBox = new mapboxgl.LngLatBounds(southWest, northEast);
  }

  public addRadar() {
    this.map.addSource('radar', {
      type: 'image',
      url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
      coordinates: [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936]
      ]
    });
    this.map.addLayer({
      id: 'radar-layer',
      type: 'raster',
      source: 'radar',
      paint: {
        'raster-fade-duration': 0
      }
    });
  }
}
