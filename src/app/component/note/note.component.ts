import { Component, OnInit } from '@angular/core';
import {VehiculeService} from "../../services/vehicule.service";
import {Router} from "@angular/router";
import {Vehicule} from "../../models/vehicule";
import {RequeteHTTPService} from "../../services/requete-http.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  vehicule:Vehicule;
  marque: string;
  modele: string;
  carburant: string;
  annee: string;
  adress:string;
  latitude:string;
  longitude:string;
  co2_emission:string;
  co2_emissionStation:string;
  idUser:string;
  codeUser:string;
  idCar:string;
  places = [];
  idFav: Set<any>;

  constructor(private unVS: VehiculeService,private service:RequeteHTTPService, private router: Router) { }

  ngOnInit(): void {
    this.vehicule = new Vehicule();
    let marque = localStorage.getItem('marque');
    let modele = localStorage.getItem('modele');
    let carburant = localStorage.getItem('carburant');
    let annee = localStorage.getItem('annee');
    let place = localStorage.getItem('adress');
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    localStorage.removeItem('marque');
    localStorage.removeItem('modele');
    localStorage.removeItem('carburant');
    localStorage.removeItem('annee');
    localStorage.removeItem('adress');
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    this.vehicule.marque=marque;
    this.vehicule.modele=modele;
    this.vehicule.carburant=carburant;
    this.vehicule.annee=annee;

    // @ts-ignore
    this.adress=place;
    // @ts-ignore
    this.latitude=latitude;
    // @ts-ignore
    this.longitude=longitude;
    // @ts-ignore
    this.getNearestPollution(latitude,longitude);
    // @ts-ignore
    this.getPollutionByModel(modele);
  }

  getNearestPollution(latitude:string,longitude:string):void{
    this.service.getPollutionByLatLong(latitude,longitude).subscribe(
      reponse =>{
        console.log("NearestPollution");
        this.co2_emissionStation=reponse['values']['no2']['v'];
      }
    )
  }

  getPollutionByModel(modele:string):void{
    this.unVS.getPollutionByModel(modele).subscribe(
      reponse =>{
        console.log("RecupByModel");
        this.co2_emission = reponse['co2_emission'];
      }
    )
  }

  changerVehicule():void{
    this.router.navigate(['/monVehicule']);
  }

  changerLocalisation():void{
    this.router.navigate(['/map']);
  }

  addFavVehicule():void{
    // @ts-ignore
    this.idUser=localStorage.getItem('idUser');
    // @ts-ignore
    this.codeUser=localStorage.getItem('codeUser');
    // @ts-ignore
    this.idCar=localStorage.getItem('idCar');

    this.unVS.addVehiculeFavori(this.idUser,this.idCar,this.codeUser).subscribe(
      reponse=>{
        console.log(reponse);
        alert('Voiture ajouté aux favoris');
        localStorage.removeItem('idCar');
      },
      error=>{
        console.log(error);
      }
    )
  }

  addFavStations():void{
    let idPlace = localStorage.getItem('place');
    let find = false;
    let i = 0;
    while (!find && i < this.places.length){
      if(this.places[i++]["id"] == idPlace){
        find = true;
      }
    }
    if(find){
      this.service.changeFavoris(localStorage.getItem('idUser'), idPlace, localStorage.getItem('codeUser')).subscribe( data => {
        if(this.idFav.has(idPlace)){
          this.idFav.delete(idPlace);
        } else{
          this.idFav.add(idPlace);
        }
      });
    } else{
      this.service.addUserPlace(localStorage.getItem("idUser"), idPlace, localStorage.getItem("codeUser")).subscribe(reponse => {
        this.service.changeFavoris(localStorage.getItem('idUser'), idPlace, localStorage.getItem('codeUser')).subscribe( data => {
          if(this.idFav.has(idPlace)){
            this.idFav.delete(idPlace);
          } else{
            this.idFav.add(idPlace);
          }
        });
      })
    }
  }
}
