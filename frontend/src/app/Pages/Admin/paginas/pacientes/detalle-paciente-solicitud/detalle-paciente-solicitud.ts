import { Component,inject } from '@angular/core';
import { PacienteResumen } from '../../componentes/card-paciente-a/card-paciente-a';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
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
      const activarUrl=`${environment.apiUrl}/administradores/paciente/activar/${this.paciente.id}`;
      const idAdmin = Number(localStorage.getItem('id_rol'));

      if (!idAdmin) {
        alert('No hay id de administrador');
        return;
      }

      const payload = { idAdmin };
       this.http.put(activarUrl, payload).subscribe({
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
 