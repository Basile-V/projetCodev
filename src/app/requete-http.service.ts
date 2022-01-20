import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

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
    return this.http.get<any>('https://api.waqi.info/mapq2/nearest?geo=1/' + latitude + '/' + longitude);
  }

  async getLatLong(postCode: string){
    return this.http.get<any>('http://localhost:8080/address?zip_code=' + postCode);
  }
}
