import {Component, OnInit} from '@angular/core';
import {VehiculeService} from "../../services/vehicule.service";
import {Router} from "@angular/router";
import {Vehicule} from "../../models/vehicule";
import {RequeteHTTPService} from "../../services/requete-http.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  vehicule: Vehicule;
  marque: string;
  modele: string;
  carburant: string;
  annee: string;
  adress: string;
  latitude: string;
  longitude: string;
  co2_emission: string;
  co2_emissionStation: string;
  idUser: string;
  codeUser: string;
  idCar: string;
  note: string;
  idPlace:string;
  conseil:string;

  constructor(private unVS: VehiculeService, private service: RequeteHTTPService, private router: Router) {
  }

  ngOnInit(): void {
    this.vehicule = new Vehicule();
    let marque = localStorage.getItem('marque');
    let modele = localStorage.getItem('modele');
    let carburant = localStorage.getItem('carburant');
    let annee = localStorage.getItem('annee');
    let idPlace = localStorage.getItem('idPlace');
    let place = localStorage.getItem('adress');
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    this.vehicule.marque = marque;
    this.vehicule.modele = modele;
    this.vehicule.carburant = carburant;
    this.vehicule.annee = annee;

    // @ts-ignore
    this.idPlace=idPlace;
    // @ts-ignore
    this.adress = place;
    // @ts-ignore
    this.latitude = latitude;
    // @ts-ignore
    this.longitude = longitude;
    // @ts-ignore
    this.getNearestPollution(latitude, longitude)
    // @ts-ignore
    this.getPollutionByModel(modele);
    this.getNote()
  }

  getNearestPollution(latitude: string, longitude: string): void {
    this.service.getPollutionByLatLong(latitude, longitude).subscribe(
      reponse => {
        console.log("NearestPollution");
        this.co2_emissionStation = reponse['values']['no2']['v'];
        localStorage.setItem('co2_emission_station', this.co2_emissionStation);
      }
    )
  }

  getPollutionByModel(modele: string): void {
    this.unVS.getPollutionByModel(modele).subscribe(
      reponse => {
        console.log("RecupByModel");
        this.co2_emission = reponse['co2_emission'];
        localStorage.setItem('co2_emission_car', this.co2_emission);
      }
    )
  }

  changerVehicule(): void {
    this.router.navigate(['/monVehicule']);
  }

  changerLocalisation(): void {
    this.router.navigate(['/map']);
  }

  addFavVehicule(): void {
    // @ts-ignore
    this.idUser = localStorage.getItem('idUser');
    // @ts-ignore
    this.codeUser = localStorage.getItem('codeUser');
    // @ts-ignore
    this.idCar = localStorage.getItem('idCar');

    this.unVS.addVehiculeFavori(this.idUser, this.idCar, this.codeUser).subscribe(
      reponse => {
        console.log(reponse);
        alert('Voiture ajouté aux favoris');
        localStorage.removeItem('idCar');
      },
      error => {
        console.log(error);
      }
    )
  }

  addFavStations(): void {
    this.service.changeFavorisPlaces(localStorage.getItem('idUser'), this.idPlace, localStorage.getItem('codeUser')).subscribe(
      reponse =>{
        alert('Station ajouté au favoris');
      },
      error =>{
        alert('Erreur ajout de la station: '+error);
      }
    );
  }

  getNote(): void {
    console.log(localStorage)
    let carCO2 = localStorage.getItem('co2_emission_car');
    let airCO2 = localStorage.getItem('co2_emission_station');
    console.log(carCO2);
    console.log(airCO2);
    // @ts-ignore
    this.service.getNote(carCO2, airCO2).subscribe(
      reponse => {
        this.note = reponse['note'];
        // @ts-ignore
        if(<number>this.note<30){
          this.conseil="Ne prenez pas votre voiture, il est préférable de prendre les transports en commun.";
        }else { // @ts-ignore
          if(<number>this.note>=30 && <number>this.note <=65){
            this.conseil="Vous pouvez prendre votre voiture, mais privilégiez les transports en commun." +
              " Pensez covoiturage";
          }else{
            this.conseil="Vous pouvez prendre votre voiture";
          }
        }
        console.log(this.note);
      },
      error => {
        console.log(error);
      }
    );
  }
}
