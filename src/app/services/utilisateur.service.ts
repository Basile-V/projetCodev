import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
const    ENDPOINT = environment.endpoint;
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private userURL: string;
  private mesHeaders: HttpHeaders;

  constructor(private httpUser: HttpClient) {
  }

  supprimerCompte(code: string | null, id: string | null): Observable<any>{
    this.userURL = ENDPOINT + 'users/delete/'+id+'/'+code;
    console.log(this.userURL);
    return(this.httpUser.delete(this.userURL));
  }
}
