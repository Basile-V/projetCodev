import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConnexionService} from "../../services/connexion.service";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  containerStyle: any;
  private errorMessage: string = '';
  loginForm: FormGroup;
  connexionForm: FormGroup;

  constructor(private unCS: ConnexionService, private router: Router) { }

  nomControl: FormControl = new FormControl('', Validators.required);
  usernameControl: FormControl = new FormControl('', Validators.required);
  passwordControl: FormControl = new FormControl('', Validators.required);
  conn_usernameControl: FormControl = new FormControl('', Validators.required);
  conn_passworControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.containerStyle = 'container';
    this.loginForm = new FormGroup({
      nomUtil: this.nomControl,
      username: this.usernameControl,
      password: this.passwordControl,
    });
    this.connexionForm = new FormGroup({
      usernameUtil: this.conn_usernameControl,
      passwordUtil: this.conn_passworControl
    })
  }

  valider(): void {

    let unUt: Utilisateur;

    unUt = new Utilisateur();
    unUt.nomUtil = this.conn_usernameControl.value;
    unUt.password = this.conn_passworControl.value;
    console.log(unUt);
    this.unCS.getLogin(unUt).subscribe(
      reponse  => {
        if(reponse==null){
          console.log('erreur connexion');
          alert('Erreur de connexion!');
        }else{
          localStorage.setItem('codeUser',reponse['code']);
          localStorage.setItem('idUser',reponse['id']);
          alert('Connexion réussi');
          this.router.navigate(['/map']);
        }
      }
    );
  }

  inscription(): void {

    let unUt: Utilisateur;

    unUt = new Utilisateur();
    unUt.name = this.nomControl.value;
    unUt.username = this.usernameControl.value;
    unUt.password = this.passwordControl.value;
    this.unCS.inscription(unUt).subscribe(
      reponse  => {
        localStorage.setItem('codeUser',reponse['code']);
        localStorage.setItem('idUser',reponse['id']);
        alert('Inscription réussie !');
        this.router.navigate(['/map']);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log("erreur inscription");
        alert('Message erreur: ' + this.errorMessage);
      }
    );
  }

}
