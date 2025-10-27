import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardAlertaA, AlertaResumen } from '../../componentes/card-alerta-a/card-alerta-a';

@Component({
  selector: 'app-alertas-activas',
  standalone: true,
  imports: [CommonModule, FormsModule, CardAlertaA],
  templateUrl: './alertas-activas.html',
  styleUrls: ['./alertas-activas.scss'],
})
export class AlertasActivas {
  // ===== buscador =====
  q = '';

  // ===== demo data =====
  alertas: AlertaResumen[] = [
    { id: 1, nivel: 'critico', paciente: 'Juan Perez',  fecha: '11/10/2025', hora: '21:00', glucosa: 50,  momento: 'Antes de dormir' },
    { id: 2, nivel: 'alta',    paciente: 'María López', fecha: '10/10/2025', hora: '08:20', glucosa: 190, momento: 'Ayunas' },
    { id: 3, nivel: 'media',   paciente: 'Carlos Díaz', fecha: '09/10/2025', hora: '14:45', glucosa: 70,  momento: 'Después de comer' },
  ];

  // Lista visible según búsqueda
  get visibles(): AlertaResumen[] {
    const t = this.q.trim().toLowerCase();
    if (!t) return this.alertas;
    return this.alertas.filter(a =>
      a.paciente.toLowerCase().includes(t) ||
      a.nivel.toLowerCase().includes(t) ||
      a.fecha.includes(t) ||
      a.hora.includes(t)
    );
  }

  trackById = (_: number, a: AlertaResumen) => a.id;

  // ===== Modal "Resolver alerta" =====
  isModalOpen = false;
  selected: AlertaResumen | null = null;
  respuesta = '';

  openDetalle(a: AlertaResumen) {
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

  resolver() {
    // Aquí iría tu llamada a la API para resolver la alerta
    console.log('Resolver alerta', { id: this.selected?.id, respuesta: this.respuesta });
    this.closeModal();
  }

  // Cerrar con tecla ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isModalOpen) this.closeModal();
  }
}
