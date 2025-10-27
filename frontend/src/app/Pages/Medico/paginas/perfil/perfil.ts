import { Component ,Input,signal,inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
export interface PerfilModelo{
  id:string;
  nombre:string;
  fechaNac:string;
  telefono:string;
  correo:string;
  matricula:string;
  departamento:string;
  carnet:string;
  admin:string
}

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  medico: any;

  ngOnInit() {
    this.medico = (history.state?.medico as PerfilModelo) ?? null;
    // fallback básico si entraron directo (sin state)
    
  }

   
}
 