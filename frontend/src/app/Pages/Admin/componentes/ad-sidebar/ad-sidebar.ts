import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Output,signal } from '@angular/core';
import { RouterLink,RouterLinkActive, RouterModule } from '@angular/router';
@Component({
  selector: 'app-ad-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './ad-sidebar.html',
  styleUrl: './ad-sidebar.scss',
})
export class AdSidebar {
  @Output() logout = new EventEmitter<void>();
  openPacientes = signal(false);
  togglePacientes(){ this.openPacientes.update(v => !v); }
  openMedicos = signal(false);
  toggleMedicos(){ this.openMedicos.update(v => !v); }

  openAdmin = signal(false);
  toggleAdmin(){ this.openAdmin.update(v => !v); }
}
