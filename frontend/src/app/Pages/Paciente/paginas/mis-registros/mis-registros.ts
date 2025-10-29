import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardPromedio } from '../../componentes/card-promedio/card-promedio';
import { CardGlucosa } from '../../componentes/card-glucosa/card-glucosa';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-mis-registros',
  imports: [CommonModule, FormsModule, CardPromedio, CardGlucosa,HttpClientModule],
  templateUrl: './mis-registros.html',
  styleUrl: './mis-registros.scss',
})
export class MisRegistros  implements OnInit {
      private http = inject(HttpClient);

  filtroSeleccionado: string = 'dia';
  fechaSeleccionada: string = '';
  mesSeleccionado: string = '';
  fechaHoy: string = '';
  
  promedioGlucosa: number = 0;
  mostrarRegistros: boolean = false;
  mostrarModal: boolean = false;
  registroSeleccionado: any = {};
  
  meses = [
    { value: '01', nombre: 'Enero' },
    { value: '02', nombre: 'Febrero' },
    { value: '03', nombre: 'Marzo' },
    { value: '04', nombre: 'Abril' },
    { value: '05', nombre: 'Mayo' },
    { value: '06', nombre: 'Junio' },
    { value: '07', nombre: 'Julio' },
    { value: '08', nombre: 'Agosto' },
    { value: '09', nombre: 'Septiembre' },
    { value: '10', nombre: 'Octubre' },
    { value: '11', nombre: 'Noviembre' },
    { value: '12', nombre: 'Diciembre' }
  ];

  // Datos simulados de registros de glucosa
  registros!:any[];

  registrosFiltrados: any[] = [];

  ngOnInit() {
    this.cargarRegistros();
    this.fechaHoy = this.getFechaHoy();
    this.filtrarRegistros();
    
  }

  getFechaHoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  cambiarFiltro() {
    this.fechaSeleccionada = '';
    this.mesSeleccionado = '';
    this.mostrarRegistros = false;
    this.registrosFiltrados = [];
    this.promedioGlucosa = 0;
    
    // Si es "del día", filtrar automáticamente
    if (this.filtroSeleccionado === 'dia') {
      this.filtrarRegistros();
    }
  }

  filtrarRegistros() {
    this.mostrarRegistros = false;

    switch (this.filtroSeleccionado) {
      case 'dia':
        // Mostrar solo registros del día actual
        this.registrosFiltrados = this.registros.filter(reg => reg.fecha === this.fechaHoy);
        this.mostrarRegistros = true;
        break;
      
      case 'fecha':
        // Solo mostrar si se seleccionó una fecha válida (no futura)
        if (this.fechaSeleccionada && this.fechaSeleccionada <= this.fechaHoy) {
          this.registrosFiltrados = this.registros.filter(reg => reg.fecha === this.fechaSeleccionada);
          this.mostrarRegistros = true;
        }
        break;
      
      case 'mes':
        // Solo mostrar si se seleccionó un mes
        if (this.mesSeleccionado) {
          this.registrosFiltrados = this.registros.filter(reg => {
            const mesRegistro = reg.fecha.split('-')[1];
            return mesRegistro === this.mesSeleccionado;
          });
          this.mostrarRegistros = true;
        }
        break;
    }

    // Calcular promedio solo si hay registros para mostrar
    if (this.mostrarRegistros) {
      this.calcularPromedio();
    }
  }

  calcularPromedio() {
    if (this.registrosFiltrados.length > 0) {
      const suma = this.registrosFiltrados.reduce((total, reg) => total + reg.nivelGlucosa, 0);
      this.promedioGlucosa = Math.round(suma / this.registrosFiltrados.length);
    } else {
      this.promedioGlucosa = 0;
    }
  }

  mostrarModalDetalle(registro: any) {
    this.registroSeleccionado = registro;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.registroSeleccionado = {};
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getMomentoDiaTexto(momento: string): string {
    const momentos: { [key: string]: string } = {
      'ayunas': 'Ayunas',
      'tarde': 'Tarde',
      'noche': 'Noche'
    };
    return momentos[momento] || momento;
  }

  getQuienTomoMuestraTexto(quien: string): string {
    return quien;
  }

  cargarRegistros(){
    const idPaciente=localStorage.getItem('id_rol')
      this.http.get<any[]>('http://localhost:3000/registros_paciente/'+idPaciente).subscribe({
      next: (data) => {
        this.registros = data;
        console.log('Momentos cargados:', this.registros);
      },
      error: (err) => console.error('Error al obtener momentos:', err)
    });
  }
}


