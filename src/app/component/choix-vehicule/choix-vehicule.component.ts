import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Vehicule} from "../../models/vehicule";
import {VehiculeService} from "../../services/vehicule.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choix-vehicule',
  templateUrl: './choix-vehicule.component.html',
  styleUrls: ['./choix-vehicule.component.css']
})
export class ChoixVehiculeComponent implements OnInit {

  containerStyle: any;
  choixVehiculeForm: FormGroup;
  marque: string | null;
  carburant: string | null;
  annee: string | null;
  vehiculeTable: JSON;
  modele_utac: Array<any>;

  constructor(private unVS: VehiculeService, private router: Router) { }

  vehiculeControl: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.containerStyle = 'container';
    this.choixVehiculeForm = new FormGroup({
      vehicule: this.vehiculeControl,
    });
    this.marque=localStorage.getItem('Marque');
    this.carburant=localStorage.getItem('Carburant');
    this.annee=localStorage.getItem('Annee');
    localStorage.removeItem('Marque');
    localStorage.removeItem('Carburant');
    localStorage.removeItem('Annee');

    this.modele_utac = new Array();
    this.vehiculeTable = JSON.parse(<string>localStorage.getItem('ListeVehicule'));
    localStorage.removeItem('ListeVehicule');
    // @ts-ignore
    for(let i=0; i< this.vehiculeTable['facet_groups'][0]['facets'][0]['count']; i++){
      // @ts-ignore
      let v = this.vehiculeTable['records'][i]['fields']['modele_utac'];
      this.modele_utac.push(v);
    }
    console.log(this.modele_utac);
  }

  enregistrerVehicule(): void{
    let unV: Vehicule;

    unV = new Vehicule();
    unV.marque= this.marque;
    unV.modele= this.vehiculeControl.value;
    unV.carburant= this.carburant;
    unV.annee= this.annee;

    this.unVS.ajouterVehicule(unV).subscribe(
      reponse => {
        alert('Ajout véhicule réussi');
        this.router.navigate(['/note'])
      },
      err => {
        alert('Erreur dans ajout du véhicule');
      }
    );
  }

}
