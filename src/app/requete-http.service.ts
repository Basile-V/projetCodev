import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    var stations: never[] = [];
    this.http.get<any>('https://api.waqi.info/mapq2/nearest?geo=1/' + latitude + '/' + longitude).subscribe(data => {
      stations = data.data.stations;
    });
    return stations;
  }
}
