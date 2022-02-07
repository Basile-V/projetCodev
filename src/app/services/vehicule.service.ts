import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Vehicule} from "../models/vehicule";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const ENDPOINT = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private vehiculeUrl: string;
  private mesHeaders: HttpHeaders;

  constructor(private httpVehicule: HttpClient) {
    this.mesHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Access-Control-Allow-Origin', '*');
  }

  addMonVehicule(idUser: string, carId: string, codeUser: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('car_id',carId);
    params = params.append('code',codeUser);
    this.vehiculeUrl=ENDPOINT+'cars/user/add/'+idUser;
    return this.httpVehicule.post(this.vehiculeUrl,{params});
  }

  ajouterVehicule(unVehicule: Vehicule): Observable<any>{
    this.vehiculeUrl = ENDPOINT + 'cars';
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpVehicule.post<Vehicule>(this.vehiculeUrl, JSON.stringify(unVehicule), options);
  }

  getMesVehicules(code: string | null, id: string | null): Observable<any>{
    this.vehiculeUrl = ENDPOINT + 'cars/user/'+id+'/'+code;
    return this.httpVehicule.get<Vehicule>(this.vehiculeUrl);
  }

  getMarque(): Observable<any>{
    this.vehiculeUrl=ENDPOINT+'car_pollution/marques';
    return this.httpVehicule.get(this.vehiculeUrl);
  }

  getModele(marque: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('marque',marque);
    this.vehiculeUrl=ENDPOINT+'car_pollution/modeles';
    return this.httpVehicule.get(this.vehiculeUrl,{params});
  }

  getCarburant(marque: string, modele: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('marque',marque);
    params = params.append('modele',modele);
    this.vehiculeUrl=ENDPOINT+'car_pollution/carburants';
    return this.httpVehicule.get(this.vehiculeUrl,{params});
  }

  getAnnee(marque: string, modele: string, carburant: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('marque',marque);
    params = params.append('modele',modele);
    params = params.append('carburant',carburant);
    this.vehiculeUrl=ENDPOINT+'car_pollution/annees';
    return this.httpVehicule.get(this.vehiculeUrl,{params});
  }
}
