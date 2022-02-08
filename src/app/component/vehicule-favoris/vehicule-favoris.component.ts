import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequeteHTTPService} from "../../services/requete-http.service";

@Component({
  selector: 'app-vehicule-favoris',
  templateUrl: './vehicule-favoris.component.html',
  styleUrls: ['./vehicule-favoris.component.css']
})
export class VehiculeFavorisComponent implements OnInit {

  idUser: any;
  codeUser: any;
  favoriteCars: Array<any>;
  lastCars: Array<any>;

  constructor(private service: RequeteHTTPService, private router: Router) { }

  ngOnInit(): void {
    this.codeUser = localStorage.getItem("codeUser");
    this.idUser = localStorage.getItem("idUser");
    this.getFavoriteCars();
  }

  getFavoriteCars(){
    this.service.getFavoriteCars(this.idUser, this.codeUser).subscribe(cars => {
      console.log(cars);
      this.favoriteCars = cars;
    });
  }

  validerMaVoiture(carMarque:string,carModele:string,carCarburant:string,carAnnee:string):void{
    localStorage.setItem('marque',carMarque);
    localStorage.setItem('modele',carModele);
    localStorage.setItem('carburant',carCarburant);
    localStorage.setItem('annee',carAnnee);
    this.router.navigate(['/note']);
  }
}
