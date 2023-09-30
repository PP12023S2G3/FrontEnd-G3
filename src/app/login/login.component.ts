import { Component, OnInit} from '@angular/core';
import { Persona } from './Persona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
persona !: Persona;

ngOnInit(): void {
  this.persona = new Persona();
  this.persona.dni = "";
  this.persona.clave = "";
}

mostrarInfo(){
  console.log("Usuario dni: " + this.persona.dni + " Usuario clave: " + this.persona.clave);
 
}

}
