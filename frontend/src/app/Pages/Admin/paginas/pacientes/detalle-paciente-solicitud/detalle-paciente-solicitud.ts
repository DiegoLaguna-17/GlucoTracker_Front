import { Component,inject } from '@angular/core';
import { PacienteResumen } from '../../componentes/card-paciente-a/card-paciente-a';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalle-paciente-solicitud',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './detalle-paciente-solicitud.html',
  styleUrl: './detalle-paciente-solicitud.scss',
})
export class DetallePacienteSolicitud {
  private http = inject(HttpClient);
  private router = inject(Router);

 paciente!: PacienteResumen;
   ngOnInit() {
    // vienes navegando con: this.router.navigate(['...'], { state: { paciente }})
    this.paciente = history.state.paciente as PacienteResumen;
    console.log('Paciente completo:', this.paciente);
  }

  activarPaciente(){
      this.activarEndpoint();
          this.router.navigate(['administrador/medicos/activos']);

    }
    activarEndpoint(){
      const activarUrl='http://localhost:3000/activar-paciente/'+this.paciente.id;
       this.http.put(activarUrl, {}).subscribe({
      next: (res) => {
        console.log('Usuario activado:', res);
        alert('Usuario activado correctamente');
      },
      error: (err) => {
        console.error('Error activando usuario:', err);
        alert('Hubo un error al activar el usuario');
      }
    });
   

    }
}
 