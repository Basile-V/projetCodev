import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConnexionService} from "../../services/connexion.service";
import {Router} from "@angular/router";
import {VehiculeService} from "../../services/vehicule.service";
import {Vehicule} from "../../models/vehicule";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-mon-vehicule',
  templateUrl: './mon-vehicule.component.html',
  styleUrls: ['./mon-vehicule.component.css']
})
export class MonVehiculeComponent implements OnInit {

  containerStyle: any;
  choixVehiculeForm: FormGroup;
  vehicule: string;
  marqueTable: Array<any>;
  modeleTable: Array<any>;
  carburantTable: Array<any>;
  anneeTable: Array<any>;

  constructor(private unVS: VehiculeService, private router: Router) { }

  marqueControl: FormControl = new FormControl('', Validators.required);
  modelControl: FormControl = new FormControl('', Validators.required);
  carburantControl: FormControl = new FormControl('', Validators.required);
  anneeControl: FormControl = new FormControl('', Validators.required);
  favoriControl: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.containerStyle = 'container';
    this.choixVehiculeForm = new FormGroup({
      marque: this.marqueControl,
      model: this.modelControl,
      carbu: this.carburantControl,
      annee: this.anneeControl,
    });
    localStorage.removeItem('marque');
    localStorage.removeItem('modele');
    localStorage.removeItem('carburant');
    localStorage.removeItem('annee');
    this.getMarque();
  }

  getMarque(): void{
    this.marqueTable = new Array();
    this.unVS.getMarque().subscribe(
      reponse => {
        for(let i=0;i<reponse.length;i++){
          let marque : string;
          marque = reponse[i]['name'];
          this.marqueTable.push(marque)
        }
      }
    );
  }

  validerMarque():void{
    this.getModele(this.marqueControl.value);
  }

  getModele(marque: string): void{
    this.modeleTable = new Array();
    this.unVS.getModele(marque).subscribe(
      reponse => {
        for(let i=0;i<reponse.length;i++){
          let model : string;
          model = reponse[i]['name'];
          this.modeleTable.push(model)
        }
      }
    );
  }

  validerModele():void{
    this.getCarburant(this.marqueControl.value,this.modelControl.value);
  }

  getCarburant(marque: string, modele:string):void{
    this.carburantTable=new Array();
    this.unVS.getCarburant(marque, modele).subscribe(
      reponse => {
        for(let i=0;i<reponse.length;i++){
          let carburant : string;
          carburant = reponse[i]['name'];
          this.carburantTable.push(carburant)
        }
      }
    );
  }

  validerCarburant():void{
    this.getAnnee(this.marqueControl.value,this.modelControl.value,this.carburantControl.value);
  }

  getAnnee(marque: string, modele:string, carburant: string):void{
    this.anneeTable=new Array();
    this.unVS.getAnnee(marque, modele,carburant).subscribe(
      reponse => {
        for(let i=0;i<reponse.length;i++){
          let annee : string;
          annee = reponse[i]['name'];
          this.anneeTable.push(annee)
        }
      }
    );
  }

  chercherVehicule(): void{
    let unV: Vehicule;

    unV = new Vehicule();
    unV.marque= this.marqueControl.value;
    unV.modele= this.modelControl.value;
    unV.carburant= this.carburantControl.value;
    unV.annee= this.anneeControl.value;
    // @ts-ignore
    localStorage.setItem('marque',unV.marque);
    // @ts-ignore
    localStorage.setItem('modele',unV.modele);
    // @ts-ignore
    localStorage.setItem('carburant',unV.carburant);
    // @ts-ignore
    localStorage.setItem('annee',unV.annee);

    this.unVS.ajouterVehicule(unV).subscribe(
      reponse => {
        localStorage.setItem('idCar',reponse['id']);
        let idCar = reponse['id'];
        // @ts-ignore
        this.addMonVehicule(idCar);
        this.router.navigate(['/note'])
      },
      err => {
        alert('Erreur dans ajout du véhicule');
      }
    );
  }

  addMonVehicule(idCar:string):void{
    let idUser = localStorage.getItem('idUser');
    let codeUser = localStorage.getItem('codeUser');
    // @ts-ignore
    this.unVS.addMonVehicule(idUser, idCar,codeUser).subscribe(
      reponse=>{
        if(this.favoriControl.value=="Oui"){
          // @ts-ignore
          this.addVehiculeFavori(idUser,idCar,codeUser);
        }
        console.log(reponse);
      },
      error =>{
        console.log(error);
      }
    );
  }

  addVehiculeFavori(idUser:string,idCar:string,codeUser:string):void{
    this.unVS.addVehiculeFavori(idUser,idCar,codeUser).subscribe(
      reponse=>{
        console.log(reponse);
        localStorage.removeItem('idCar');
      },
      error=>{
        console.log(error);
      }
    )
  }
}
