import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Utilisateur} from "../models/Utilisateur";

const    ENDPOINT = environment.endpoint;

@Injectable()
export class ConnexionService {

  private headers = new Headers( {'content-type' : 'application/json'} );

  private ClientUrl: string;


  constructor(private httpClient : HttpClient) {

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
  }


  getLogin(unUti : Utilisateur) : Observable<any>
  {
    this.ClientUrl= ENDPOINT + 'authentification/login';

    return this.httpClient.post<Utilisateur>(this.ClientUrl,unUti);

  }

  inscription(user: Utilisateur): Observable<any> {
    this.ClientUrl = ENDPOINT + 'users';

    return this.httpClient.post<Utilisateur>(this.ClientUrl, user);
  }
}
