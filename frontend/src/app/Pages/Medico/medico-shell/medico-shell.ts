import { Component } from '@angular/core';
import { MedSidebar } from '../componentes/med-sidebar/med-sidebar';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-medico-shell',
  imports: [MedSidebar,RouterOutlet],
  templateUrl: './medico-shell.html',
  styleUrl: './medico-shell.scss',
})
export class MedicoShell {
  onLogout(){
    // Cuando tengas auth real, llama a tu servicio y navega a /login
    location.href = '';
  }
}
