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
  lastCars: Array<any>;
  lastPlaces: Array<any>;

  constructor(private service: RequeteHTTPService, private utilisateur: UtilisateurService, private router: Router) { }

  ngOnInit(): void {
    this.codeUser = localStorage.getItem("codeUser");
    this.idUser = localStorage.getItem("idUser");
    this.getFavoriteCars();
    this.getFavoritePlaces();
    this.getLastCars();
    this.getLastPlaces();
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

  getLastCars(){
    this.service.getLastCars(this.idUser, this.codeUser).subscribe(cars => {
      console.log(cars);
      this.lastCars = cars;
    });
  }

  getLastPlaces(){
    this.service.getLastPlaces(this.idUser, this.codeUser).subscribe(places => {
      console.log(places);
      this.lastPlaces = places;
    });
  }

  goToCar(modele: string,marque:string,carburant:string,annee:string){
    localStorage.removeItem('marque');
    localStorage.removeItem('modele');
    localStorage.removeItem('carburant');
    localStorage.removeItem('annee');
    localStorage.setItem('marque',marque);
    localStorage.setItem('modele',modele);
    localStorage.setItem('carburant',carburant);
    localStorage.setItem('annee',annee);
    this.router.navigate(["/note"])
  }

  goToPlace(adress: string, latitude:string, longitude:string){
    localStorage.setItem("adress", adress);
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    this.router.navigate(["/monVehicule"])
  }
}
