import { Component, OnInit } from '@angular/core';
import {RequeteHTTPService} from "../../services/requete-http.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  idUser: any;
  codeUser: any;
  favoriteCars: Array<any>;
  favoritePlaces: Array<any>;

  constructor(private service: RequeteHTTPService, private utilisateur: UtilisateurService, private router: Router) { }

  ngOnInit(): void {
    this.codeUser = localStorage.getItem("codeUser");
    this.idUser = localStorage.getItem("idUser");
    this.getFavoriteCars();
    this.getFavoritePlaces();
  }

  deconnexion(): void {
    localStorage.removeItem('codeUser');
    localStorage.removeItem('idUser');
    this.router.navigate(['/connexion']);
  }

  supprimerCompte(){
    let code = localStorage.getItem('codeUser');
    let id = localStorage.getItem('idUser');
    this.utilisateur.supprimerCompte(code,id).subscribe(
      reponse =>{
        alert("Suppression réussite");
      }
    );
    localStorage.removeItem('codeUser');
    localStorage.removeItem('idUser');
    this.router.navigate(['/connexion']);
  }

  getFavoriteCars(){
    this.service.getFavoriteCars(this.idUser, this.codeUser).subscribe(cars => {
      console.log(cars);
      this.favoriteCars = cars;
    });
  }

  getFavoritePlaces(){
    this.service.getFavoritePlaces(this.idUser, this.codeUser).subscribe(places => {
      console.log(places);
      this.favoritePlaces = places;
    });
  }
}
