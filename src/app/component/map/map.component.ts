import { Component, AfterViewInit } from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {newArray} from "@angular/compiler/src/util";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  closestStations = new Array();
  markerId = new Map();

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 46.833, 2.333 ],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  addStation(lat: any, lon: any, name: string, id: number){
    const marker = L.marker([lat, lon]).addTo(this.map);
    marker.bindPopup(name);
    // marker.on('click', this.printStat);
    marker.addTo(this.map);
    // this.markerId.set(marker._leaflet_id, id);
    // console.log(marker._leaflet_id, id);
  }

  childToParent($event: Array<any>) {
    this.closestStations = $event;
    for (let i = 0; i < this.closestStations.length; i++){
      this.addStation(this.closestStations[i].latitude, this.closestStations[i].longitude, this.closestStations[i].address, this.closestStations[i].id);
    }
  }


  // printStat(e: any){
  //   console.log(e.target._leaflet_id);
  //   this.markerId.get(e.target._leaflet_id);
  // }
}
