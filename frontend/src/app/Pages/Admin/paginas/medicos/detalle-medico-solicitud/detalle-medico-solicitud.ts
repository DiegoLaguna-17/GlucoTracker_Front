import { Component ,OnInit,inject,signal} from '@angular/core';
import { PerfilModelo } from '../../componentes/card-medico-a/card-medico-a';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalle-medico-solicitud',
  imports: [HttpClientModule],
  templateUrl: './detalle-medico-solicitud.html',
  styleUrl: './detalle-medico-solicitud.scss',
})
export class DetalleMedicoSolicitud {
  private http = inject(HttpClient);
  private router = inject(Router);


 medico!: PerfilModelo;
     ngOnInit() {
      // vienes navegando con: this.router.navigate(['...'], { state: { paciente }})
      this.medico = history.state.medico as PerfilModelo;
      console.log('Paciente completo:', this.medico);
    }
    activarMedico(){
      this.activarEndpoint();
          this.router.navigate(['administrador/medicos/activos']);

    }
    activarEndpoint(){
      const activarUrl='http://localhost:3000/activar-medico/'+this.medico.id;
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
