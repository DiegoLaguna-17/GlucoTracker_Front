import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Output,signal } from '@angular/core';
import { RouterLink,RouterLinkActive, RouterModule } from '@angular/router';
import { PerfilModelo } from '../../paginas/perfil/perfil';
@Component({
  selector: 'app-med-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './med-sidebar.html',
  styleUrl: './med-sidebar.scss',
})
export class MedSidebar {
   @Output() logout = new EventEmitter<void>();
  openAlertas = signal(false);
  toggleAlertas(){ this.openAlertas.update(v => !v); }
  medic:PerfilModelo={
    id: '1',
  nombre: 'Carlos Gomez',
  fechaNac: '2000-07-15',
  telefono: '79876543',
  correo: 'carlos.gomez@gmail.com',
  matricula: 'A12345',
  departamento: 'Informática',
  carnet: '1234567LP',
  admin: 'No'
  };
  
}
