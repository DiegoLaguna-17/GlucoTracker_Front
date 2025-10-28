import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Output,signal } from '@angular/core';
import { RouterLink,RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './paciente-sidebar.html',
  styleUrl: './paciente-sidebar.scss',
})
export class PacienteSidebar {
  @Output() logout = new EventEmitter<void>();
  openAlertas = signal(false);
  toggleAlertas(){ this.openAlertas.update(v => !v); }
  perfil(){
    console.log('yendo a perfil')
  }
}
