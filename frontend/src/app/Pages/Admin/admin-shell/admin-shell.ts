import { Component } from '@angular/core';
import { AdSidebar } from '../componentes/ad-sidebar/ad-sidebar';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-shell',
  imports: [AdSidebar,RouterOutlet],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  onLogout(){
    // Cuando tengas auth real, llama a tu servicio y navega a /login
    location.href = '';
  }
}
