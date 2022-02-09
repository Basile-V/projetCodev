import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Place} from "../models/place";
import {Observable} from "rxjs";
import {Utilisateur} from "../models/utilisateur";
import {END} from "@angular/cdk/keycodes";
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

  getPollution(id: number){
    return this.http.get<any>(ENDPOINT + 'pollution/' + id);
  }

  async getLatLong(postCode: string){
    return this.http.get<any>(ENDPOINT + 'address?zip_code=' + postCode);
  }

  getFavoriteCars(id: string, code: string){
    return this.http.get<any>(ENDPOINT + "cars/favorite/" + id + "?code=" + code);
  }

  getLastCars(id: string, code: string){
    return this.http.get<any>(ENDPOINT + "cars/lastCars/" + id + "?code=" + code);
  }

  getFavoritePlaces(id: any, code: any){
    return this.http.get<any>(ENDPOINT + "places/favorite/" + id + "?code=" + code);
  }

  getLastPlaces(id: string, code: string){
    return this.http.get<any>(ENDPOINT + "places/lastPlaces/" + id + "?code=" + code);
  }

  getPlacesByUserId(id: any, code: any){
    return this.http.get<any>(ENDPOINT + "places/user/" + id + "?code=" + code);
  }

  addplace(place: Place): Observable<any>{
    return this.http.post<Utilisateur>(ENDPOINT + "places", place);
  }

  addUserPlace(userId: any, placeId: any, code: any): Observable<any>{
    return this.http.post<Utilisateur>(ENDPOINT + "places/user/add/" + userId+ "?place_id=" + placeId + "&code=" + code, null);
  }

  changeFavorisPlaces(userId: any, placeId: any, code: any): Observable<any>{
    return this.http.put<Utilisateur>(ENDPOINT + "places/changeFavorite/" + userId+ "?place_id=" + placeId + "&code=" + code, null);
  }

  changeFavorisCars(userId: any, placeId: any, code: any): Observable<any>{
    return this.http.put<Utilisateur>(ENDPOINT + "cars/changeFavorite/" + userId+ "?car_id=" + placeId + "&code=" + code, null);
  }

  getPollutionByLatLong(latitude:string,longitude:string): Observable<any>{
    return this.http.get<any>(ENDPOINT + "pollution?latitude="+latitude+"&longitude="+longitude);
  }

  getNote(co2Vehicule:string,co2Station:string): Observable<any>{
    return this.http.get<any>(ENDPOINT + 'note?carCO2='+co2Vehicule+'&airCO2='+co2Station);
  }
}
