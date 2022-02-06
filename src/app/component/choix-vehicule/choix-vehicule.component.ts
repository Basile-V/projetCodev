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
  favoriControl: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.marque=localStorage.getItem('Marque');
    this.carburant=localStorage.getItem('Carburant');
    this.annee=localStorage.getItem('Annee');

    if(this.marque!=null && this.carburant != null && this.annee != null){
      this.containerStyle = 'container';
      this.choixVehiculeForm = new FormGroup({
        vehicule: this.vehiculeControl,
        favoris: this.favoriControl,
      });
      localStorage.removeItem('Marque');
      localStorage.removeItem('Carburant');
      localStorage.removeItem('Annee');

      this.modele_utac = new Array();
      this.vehiculeTable = JSON.parse(<string>localStorage.getItem('ListeVehicule'));
      localStorage.removeItem('ListeVehicule');
      // @ts-ignore
      if(this.vehiculeTable['nhits']==0){
        this.router.navigate(['/erreurVehicule'])
      }else{
        // @ts-ignore
        for(let i=0; i< this.vehiculeTable['facet_groups'][0]['facets'][0]['count']; i++){
          // @ts-ignore
          let v = this.vehiculeTable['records'][i]['fields']['designation_commerciale'];
          this.modele_utac.push(v);
        }
      }
    }else{
      this.router.navigate(['/monVehicule'])
    }

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
