import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RequeteHTTPService} from '../../requete-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closestStations = [];
  postcode = "";
  connected: boolean;
  connexion: string;

  constructor(private service: RequeteHTTPService) { }

  ngOnInit() {
//    this.connected = window.localStorage.getItem('code').length > 0;
//    this.connected ? this.connexion = "/header" : this.connexion = "/deconnexion";
  }

  deconnexion(): void {
    window.localStorage.removeItem('code');
  }

  getLocation(){
    this.service.getLocationService().then(resp=>{
      this.service.getStations(resp.lat, resp.lng).subscribe(stations => {
        this.closestStations = stations.data.stations;
      });
    })
  }

  async getPostcode() {
    if (this.postcode.length == 5) {
      (await this.service.getLatLong(this.postcode)).subscribe(data => {
        if(data.length > 0){
          this.service.getStations(data[0].latitude, data[0].longitude).subscribe(stations => {
            this.closestStations = stations.data.stations;
          });
        }
      });
    }
  }

  getClosestStation(){
    console.log(this.closestStations);
  }
}
