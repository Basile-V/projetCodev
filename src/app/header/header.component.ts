import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {RequeteHTTPService} from '../requete-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closestStations = [];
  postcode = "";


  constructor(private service: RequeteHTTPService) { }

  ngOnInit() {
  }

  getLocation(){
    this.service.getLocationService().then(resp=>{
      this.closestStations = this.service.getStations(resp.lat, resp.lng);
    })
  }

  async getPostcode() {
    if (this.postcode.length == 5) {
      var res = await this.service.getLatLong(this.postcode);
      console.log(res);
    }
  }
}
