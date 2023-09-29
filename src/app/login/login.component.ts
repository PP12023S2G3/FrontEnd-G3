import { Component, OnInit} from '@angular/core';
import { Persona } from './Persona';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
id ?: any;
password ?: any;
persona !: Persona;

ngOnInit(): void {
  this.persona = new Persona();
}


}
