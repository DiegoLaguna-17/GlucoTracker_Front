import { Component, HostListener,signal,inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardAlertaA, AlertaResumen } from '../../componentes/card-alerta-a/card-alerta-a';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-alertas-activas',
  standalone: true,
  imports: [CommonModule, FormsModule, CardAlertaA,HttpClientModule],
  templateUrl: './alertas-activas.html',
  styleUrls: ['./alertas-activas.scss'],
})
export class AlertasActivas implements OnInit {
  // ===== buscador =====
  q = '';
    private http = inject(HttpClient);
  // ===== demo data =====
  alertas = signal<AlertaResumen[]>([]);
  loading = signal(false);
  error = signal('');


  // Lista visible según búsqueda
 get visibles(): AlertaResumen[] {
  const t = this.q.trim().toLowerCase();
  if (!t) return this.alertas();
  
  return this.alertas().filter(a =>
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

  cargarAlertas(idMedico: string|null) {
    this.loading.set(true);
    this.http
      .get<AlertaResumen[]>(`${environment.apiUrl}/medicos/alertasActivas/${idMedico}`)
      .subscribe({
        next: (data) => {
          // mapear los tipos si es necesario
          const alertasMapeadas: AlertaResumen[] = data.map((a) => ({
            id: a.id,
            nivel: a.nivel,
            idpaciente: a.idpaciente.toString(),
            paciente: a.paciente,
            fecha: new Date(a.fecha).toLocaleDateString('es-BO'), // dd/MM/yyyy
            hora: a.hora.slice(0, 5), // HH:mm
            glucosa: Number(a.glucosa),
            momento: a.momento || '',
          }));

          this.alertas.set(alertasMapeadas);
          console.log('Alertas cargadas:', this.alertas());
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar alertas:', err);
          this.error.set('No se pudieron cargar las alertas.');
          this.loading.set(false);
        },
      });
  }
  ngOnInit(){
    const idMedico=localStorage.getItem('id_rol');
    this.cargarAlertas(idMedico);
  }
}
