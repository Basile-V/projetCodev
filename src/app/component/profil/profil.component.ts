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
    this.router.navigate(["/note"]);
  }

  goToPlace(id: string){
    localStorage.setItem("place", id);
    this.router.navigate(["/monVehicule"]);
  }

  favoris(id: any): boolean{
    let find = false;
    let i = 0;
    while (!find && i < this.favoritePlaces.length){
      if(+this.favoritePlaces[i++].id == +id){
        find = true;
      }
    }
    return find;
  }
  changeFavoris(id: any, index: any){
    let find = false;
    let i = 0;
    while (!find && i < this.favoritePlaces.length){
      if(+this.favoritePlaces[i++].id == +id){
        find = true;
      }
    }
    this.service.changeFavoris(localStorage.getItem('idUser'), id, localStorage.getItem('codeUser')).subscribe( data => {
      if(!find){
        this.favoritePlaces.push(this.lastPlaces[index]);
      } else{
        this.favoritePlaces.splice(i - 1, 1);
      }
    });
  }
}
