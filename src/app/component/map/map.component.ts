import { Component, AfterViewInit } from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {RequeteHTTPService} from "../../services/requete-http.service";
import {Place} from "../../models/place";
import {Router} from "@angular/router";

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
  showButton: boolean;
  markers: Array<any>;

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

  constructor(private service: RequeteHTTPService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.markers = new Array();
    this.initMap();
    if(localStorage.getItem("place") != null){
      // @ts-ignore
      this.loadStat(+localStorage.getItem("place"), true);
      localStorage.removeItem("place");
    }
    if(localStorage.getItem("button") == String(true) || localStorage.getItem("idCar") != null){
      console.log(localStorage)
      this.showButton = true;
    } else{
      this.showButton = false;
    }
    this.getFavoritePlaces();
    this.getPlace();
  }

  addStation(lat: any, lon: any, name: string) {
    const marker = L.marker([lat, lon]).addTo(this.map);
    marker.bindPopup(name);
    marker.addTo(this.map);
    this.markers.push(marker);
  }

  childToParent($event: Array<any>) {
    this.closestStations = $event;
    while (this.markers.length > 0){
      this.map.removeLayer(this.markers.pop());
    }
    for (let i = 0; i < this.closestStations.length; i++) {
      this.addStation(this.closestStations[i].latitude, this.closestStations[i].longitude, this.closestStations[i].address);
    }
    if(this.closestStations.length > 0){
      this.map.flyTo([this.closestStations[0].latitude, this.closestStations[0].longitude], 15);
    }
    if(this.closestStations.length > 0){
      this.loadStat(this.closestStations[0].id);
    }
  }

  loadStat(id: number, marker = false) {
//    localStorage.removeItem('idPlace');             A mettre pour supprimer l'idPlace courant et le remplacer ?

    this.values = new Map();
    this.otherDays = new Map();
    this.service.getPollution(id).subscribe(data => {
      this.city = data["city"];
      console.log(data)
      localStorage.setItem('idPlace', id.toString());
      localStorage.setItem('adress', data["city"]);
      localStorage.setItem('latitude', data["latitude"]);
      localStorage.setItem('longitude', data["longitude"]);
      this.map.flyTo([data["latitude"], data["longitude"]], 15);
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
    console.log(localStorage)
  }

  printStat(val: any, selected: number){
    // @ts-ignore
    return "moyenne : " + val[selected]["avg"] + ", min : " + val[selected]["min"] + ", max : " + val[selected]["max"];
  }

  getPlace(){
    this.service.getPlacesByUserId(localStorage.getItem('idUser'), localStorage.getItem('codeUser')).subscribe(data => {
      this.places = data;
    });
  }

  getFavoritePlaces(){
    this.service.getFavoritePlaces(localStorage.getItem('idUser'), localStorage.getItem('codeUser')).subscribe(places => {
      this.idFav = new Set<any>();
      for(var i = 0; i < places.length; i++){
        this.idFav.add(places[i]["id"]);
      }
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
        if(this.idFav.has(+id)){
          this.idFav.delete(+id);
        } else{
          this.idFav.add(+id);
        }
      });
    } else{
      this.service.addUserPlace(localStorage.getItem("idUser"), id, localStorage.getItem("codeUser")).subscribe(reponse => {
        this.service.changeFavoris(localStorage.getItem('idUser'), id, localStorage.getItem('codeUser')).subscribe( data => {
          if(this.idFav.has(+id)){
            this.idFav.delete(+id);
          } else{
            this.idFav.add(+id);
          }
        });
      })
    }
  }

  goCars(){
    localStorage.setItem("button", String(false));
    this.router.navigate(["/monVehicule"]);
  }

  goNote(){
    localStorage.setItem("button", String(false));
    this.router.navigate(["/note"]);
  }
}
