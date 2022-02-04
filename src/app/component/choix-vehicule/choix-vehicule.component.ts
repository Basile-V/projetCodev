import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Vehicule} from "../../models/vehicule";
import {VehiculeService} from "../../services/vehicule.service";

@Component({
  selector: 'app-choix-vehicule',
  templateUrl: './choix-vehicule.component.html',
  styleUrls: ['./choix-vehicule.component.css']
})
export class ChoixVehiculeComponent implements OnInit {

  containerStyle: any;
  choixVehiculeForm: FormGroup;
  vehiculeJSON: JSON;
  vehiculeTable: Vehicule[];


  constructor() { }

  vehiculeControl: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.vehiculeJSON = JSON.parse(<string>localStorage.getItem('ListeVehicule'));
    localStorage.removeItem('ListeVehicule');

    if(this.vehiculeJSON != null){
      // @ts-ignore
      for (let i = 0; i < this.vehiculeJSON['nhits']; i++) {
        let unV = new Vehicule();
        // @ts-ignore
        unV.marque=this.vehiculeJSON['records'][i]['fields']['marque'];
        // @ts-ignore
        unV.modele=this.vehiculeJSON['records'][i]['fields']['modele_utac'];
        // @ts-ignore
        unV.carburant=this.vehiculeJSON['records'][i]['fields']['carburant'];
        // @ts-ignore
        unV.annee=this.vehiculeJSON['records'][i]['fields']['annee'];
        this.vehiculeTable.push(unV);
      }
    }
  }

  enregistrerVehicule(): void{

  }

}
