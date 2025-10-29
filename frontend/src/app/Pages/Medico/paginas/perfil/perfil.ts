import { Component ,Input,signal,inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface PerfilModelo{
  id:string;
  nombre:string;
  fechaNac:string;
  telefono:string;
  correo:string;
  matricula:string;
  departamento:string;
  carnet:string;
  admin:string
}

@Component({
  selector: 'app-perfil',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  private http = inject(HttpClient);
    pdf?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  loading = false;
  error = '';
  medico?:PerfilModelo;
  idUsuario = localStorage.getItem('id_usuario'); // devuelve string | null
  rol = localStorage.getItem('rol');
  idRol=localStorage.getItem('id_rol')
  ngOnInit() {
    // fallback básico si entraron directo (sin state)
    this.cargarPerfil();
   
  }
  cargarPerfil(){
    this.http.get<PerfilModelo>(`https://gt-prueba-1.onrender.com/perfil_medico/${this.idUsuario}`)
      .subscribe({
        next: (data) => {
          this.medico = data;
          console.log('Médico:', this.medico);
          if (this.medico.matricula) {
            this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.medico.matricula);
          }
        },
        error: (err) => {
          console.error('Error al obtener médico:', err);
        }
      });
       

   
}
}
 