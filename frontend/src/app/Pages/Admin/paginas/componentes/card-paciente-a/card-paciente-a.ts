import { Component,Input, Output , EventEmitter} from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PacienteResumen {
  id: number | string;
  nombre: string;
  ci: string;
  fechaNac:String;
  genero:String;
  peso:String;
  altura:String;
  actividadFisica:string;
  telefono:String;
  Correo:String;
  afecciones:Afecciones[];
  tratamientos:Tratamientos[];
  admitidoPor:string|null;
}
export interface Afecciones{
  afeccion:string;
}
export interface Tratamientos{
  titulo:string;
  desc:string;
  dosis:string;
}

@Component({
  selector: 'app-card-paciente-a',
  imports: [],
  templateUrl: './card-paciente-a.html',
  styleUrl: './card-paciente-a.scss',
})
export class CardPacienteA {
  @Input() paciente!: PacienteResumen;
    @Output() ver = new EventEmitter<PacienteResumen>();

}
