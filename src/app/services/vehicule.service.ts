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

  chercherVehicule(unVehicule: string): Observable<any>{
    let params = new HttpParams();

    params = params.append('dataset', 'vehicules-commercialises');
    params = params.append('q', unVehicule);
    params = params.append('facet', 'marque');
    params = params.append('facet', 'modele_utac');
    params = params.append('facet', 'carburant');
    this.vehiculeUrl = 'https://public.opendatasoft.com/api/records/1.0/search';

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Header': '*'
    });
    return this.httpVehicule.get(this.vehiculeUrl, { params: params })
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
}
