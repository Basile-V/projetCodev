import { Component, AfterViewInit } from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {RequeteHTTPService} from "../../services/requete-http.service";
import {Place} from "../../models/place";

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
  stationSelected: any;
  values: Map<string, number>;
  city: string;
  otherDays: Map<string, Array<any>>;
  dates: Array<any>;
  selected = 0;
  places = [];
  idFav: Set<any>;

  initMap(): void {
    this.map = L.map('map', {
      center: [46.833, 2.333],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private service: RequeteHTTPService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    if(localStorage.getItem("place") != null){
      // @ts-ignore
      this.loadStat(+localStorage.getItem("place"), true);
      localStorage.removeItem("place");
    }
    this.getPlace();
  }

  addStation(lat: any, lon: any, name: string) {
    const marker = L.marker([lat, lon]).addTo(this.map);
    marker.bindPopup(name);
    marker.addTo(this.map);
  }

  childToParent($event: Array<any>) {
    this.closestStations = $event;
    for (let i = 0; i < this.closestStations.length; i++) {
      this.addStation(this.closestStations[i].latitude, this.closestStations[i].longitude, this.closestStations[i].address);
    }
    if(this.closestStations.length > 0){
      this.loadStat(this.closestStations[0].id);
    }
  }

  loadStat(id: number, marker = false) {
    this.values = new Map();
    this.otherDays = new Map();
    this.service.getPollution(id).subscribe(data => {
      this.city = data["city"];
      if(marker){
        this.addStation(data["latitude"], data["longitude"], data["city"])
      } else{
        let find = false;
        let i = 0;
        while (!find && i < this.places.length){
          if(this.places[i]["id"] == id || this.places[i]["address"] == data["city"] || (this.places[i]["latitude"] == data["latitude"] && this.places[i]["longitude"] == data["longitude"])){
            find = true;
          }
          i++;
        }
        if(!find){
          let unePlace = new Place();
          unePlace.id = id.toString();
          unePlace.address = data['city'];
          unePlace.latitude = data['latitude'];
          unePlace.longitude = data['longitude'];
          this.service.addplace(unePlace).subscribe();
        }
        this.service.addUserPlace(localStorage.getItem("idUser"), id, localStorage.getItem("codeUser")).subscribe(reponse => {
        })
      }
      for(const [key, value] of Object.entries(data["values"])){
        // @ts-ignore
        if (typeof value["v"] === "number") {
          // @ts-ignore
          this.values.set(key, value["v"]);
        }
      }
      let lastValue;
      for(const [key, value] of Object.entries(data["nextDays"])){
        // @ts-ignore
        this.otherDays.set(key, value);
        lastValue = value;
      }
      this.dates = new Array();
      // @ts-ignore
      for(var i = 0; i < lastValue.length; i++){
        // @ts-ignore
        this.dates.push(lastValue[i]["day"]);
      }
    });
  }

  printStat(val: any, selected: number){
    // @ts-ignore
    return "moyenne : " + val[selected]["avg"] + ", min : " + val[selected]["min"] + ", max : " + val[selected]["max"];
  }

  getPlace(){
    this.service.getPlacesByUserId(localStorage.getItem('idUser'), localStorage.getItem('codeUser')).subscribe(data => {
      this.places = data;
      this.idFav = new Set<any>();
      console.log(data);
      for(var i = 0; i < data.length; i++){
        this.idFav.add(data[i]["id"]);
      }
      console.log(this.idFav);
    });
  }

  changeFavoris(id: any){
    let find = false;
    let i = 0;
    while (!find && i < this.places.length){
      if(this.places[i++]["id"] == id){
        find = true;
      }
    }
    if(find){
      this.service.changeFavoris(localStorage.getItem('idUser'), id, localStorage.getItem('codeUser')).subscribe( data => {
        if(this.idFav.has(id)){
          this.idFav.delete(id);
        } else{
          this.idFav.add(id);
        }
      });
    } else{
      this.service.addUserPlace(localStorage.getItem("idUser"), id, localStorage.getItem("codeUser")).subscribe(reponse => {
        this.service.changeFavoris(localStorage.getItem('idUser'), id, localStorage.getItem('codeUser')).subscribe( data => {
          if(this.idFav.has(id)){
            this.idFav.delete(id);
          } else{
            this.idFav.add(id);
          }
        });
      })
    }
  }
}
