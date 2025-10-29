import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardPromedioComponent } from '../../componentes/card-promedio/card-promedio'; 
import { CardGlucosaComponent } from '../../componentes/card-glucosa/card-glucosa';

@Component({
  selector: 'app-mis-registros',
  imports: [CommonModule, FormsModule, CardPromedioComponent, CardGlucosaComponent],
  templateUrl: './mis-registros.html',
  styleUrl: './mis-registros.scss',
})
export class MisRegistrosComponent implements OnInit {
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
  registros = [
    { 
      id: 1, 
      fecha: this.getFechaHoy(), 
      hora: '08:00:00',
      nivelGlucosa: 110, 
      momentoDia: 'ayunas', 
      quienTomoMuestra: 'paciente',
      observaciones: 'Sin observaciones' 
    },
    { 
      id: 2, 
      fecha: this.getFechaHoy(), 
      hora: '14:30:00',
      nivelGlucosa: 97, 
      momentoDia: 'tarde', 
      quienTomoMuestra: 'paciente',
      observaciones: 'Después del almuerzo' 
    },
    { 
      id: 3, 
      fecha: this.getFechaHoy(), 
      hora: '21:15:00',
      nivelGlucosa: 102, 
      momentoDia: 'noche', 
      quienTomoMuestra: 'medico',
      observaciones: 'Antes de dormir' 
    },
    { 
      id: 4, 
      fecha: '2024-12-11', 
      hora: '07:45:00',
      nivelGlucosa: 105, 
      momentoDia: 'ayunas', 
      quienTomoMuestra: 'paciente',
      observaciones: 'En ayunas' 
    },
    { 
      id: 5, 
      fecha: '2024-12-11', 
      hora: '16:20:00',
      nivelGlucosa: 120, 
      momentoDia: 'tarde', 
      quienTomoMuestra: 'paciente',
      observaciones: 'Post ejercicio' 
    },
    { 
      id: 6, 
      fecha: '2024-11-15', 
      hora: '08:30:00',
      nivelGlucosa: 98, 
      momentoDia: 'ayunas', 
      quienTomoMuestra: 'medico',
      observaciones: 'Normal' 
    }
  ];

  registrosFiltrados: any[] = [];

  ngOnInit() {
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
    return quien === 'paciente' ? 'Paciente' : 'Médico';
  }
}