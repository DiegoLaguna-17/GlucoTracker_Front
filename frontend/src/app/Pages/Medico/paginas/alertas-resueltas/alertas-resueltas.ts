import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardAlertaR } from '../../componentes/card-alerta-r/card-alerta-r';
import { AlertaResumenR } from '../../componentes/card-alerta-r/card-alerta-r';
@Component({
  selector: 'app-alertas-resueltas',
  imports: [CardAlertaR, CommonModule],
  templateUrl: './alertas-resueltas.html',
  styleUrl: './alertas-resueltas.scss',
})
export class AlertasResueltas {
   q = '';
    // demo data
      alertas: AlertaResumenR[] = [
    { id: 1, nivel: 'Crítico', idPaciente:'10',paciente: 'Juan Perez',  fecha: '11/10/2025', hora: '21:00', glucosa: 50,  momento: 'Antes de dormir' ,respuesta:'Interesante'},
    { id: 2, nivel: 'Alerta Alta', idPaciente:'11',paciente: 'María López', fecha: '10/10/2025', hora: '08:20', glucosa: 190, momento: 'Ayunas' ,respuesta:'Interesante'},
    { id: 3, nivel: 'Moderada',  idPaciente:'12', paciente: 'Carlos Díaz', fecha: '09/10/2025', hora: '14:45', glucosa: 70,  momento: 'Después de comer',respuesta:'Interesante' },
  ];
  // Lista visible según búsqueda
  get visibles(): AlertaResumenR[] {
    const t = this.q.trim().toLowerCase();
    if (!t) return this.alertas;
    return this.alertas.filter(a =>
      a.paciente.toLowerCase().includes(t) ||
      a.nivel.toLowerCase().includes(t) ||
      a.fecha.includes(t) ||
      a.hora.includes(t)
    );
  }

  trackById = (_: number, a: AlertaResumenR) => a.id;

  // ===== Modal "Resolver alerta" =====
  isModalOpen = false;
  selected: AlertaResumenR | null = null;
  respuesta = '';

  openDetalle(a: AlertaResumenR) {
    this.selected = a;
    this.respuesta = '';
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // bloquear scroll de fondo
  }

  closeModal() {
    this.isModalOpen = false;
    this.selected = null;
    this.respuesta = '';
    document.body.style.overflow = '';
  }

  

  // Cerrar con tecla ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isModalOpen) this.closeModal();
  }
}
