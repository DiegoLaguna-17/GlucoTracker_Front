import { Component, Input,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';  
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
export interface Treatment {
  titulo: string;
  descripcion: string;
  dosis: string;
}

export interface Patient {
  nombre: string;
  id: string;
  fechaNac: string;  // ISO o dd/mm/aaaa
  genero: string;
  altura: string;    // "176 centímetros"
  peso: string;      // "80 Kilogramos"
  telefono: string;
  correo: string;
  actividadFisica: {
    nivel: 'Baja' | 'Moderada' | 'Alta';
    descripcion: string;
  };
  afecciones: string[];
  tratamientos: Treatment[];
  admitidoPor: string;
  embarazo:boolean,
  nombre_emergencia:string,
  numero_emergencia:string
  foto_perfil:string;
}

@Component({
  selector: 'app-perfil',
  imports: [NgFor, NgIf,HttpClientModule, CommonModule ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  standalone:true,
})
export class Perfil implements OnInit{
  @Input() patient: Patient | null = null;
  private http = inject(HttpClient);
  private router = inject(Router);
  demo!: Patient ;
  get data(): Patient {
    return this.patient ?? this.demo;
  }
  cargarPaciente() {
    const idPaciente=localStorage.getItem('id_rol')
    const url = `${environment.apiUrl}/pacientes/perfil/${idPaciente}`;
    this.http.get<Patient>(url).subscribe({
      next: (data) => {
        this.patient = data;
        console.log('Paciente cargado:', this.patient);
      },
      error: (err) => {
        console.error('Error al cargar paciente:', err);
      }
    });
  }
  ngOnInit() {
    if (!this.patient) {
      // Si no llega patient por Input, cargamos desde el backend
      this.cargarPaciente(); // <--- reemplaza 1 por el id que necesites
    }
  }

  editarPerfil() {
    // Navegar al componente de edición
    this.router.navigate(['/paciente/editar-paciente']);
  }
}
