import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
const    ENDPOINT = environment.endpoint;
@Injectable({
  providedIn: 'root'
})
export class RequeteHTTPService {

  constructor(private http: HttpClient) { }

  getLocationService():Promise<any>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude})
      })
    })
  }

  getStations(latitude: string, longitude: string){
    return this.http.get<any>(ENDPOINT + 'pollution/nearestStations?latitude=' + latitude + '&longitude=' + longitude);
  }

  async getLatLong(postCode: string){
    return this.http.get<any>(ENDPOINT + 'address?zip_code=' + postCode);
  }
}
