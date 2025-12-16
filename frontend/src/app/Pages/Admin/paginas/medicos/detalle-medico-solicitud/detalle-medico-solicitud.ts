import { Component ,OnInit,inject,signal} from '@angular/core';
import { PerfilModelo } from '../../componentes/card-medico-a/card-medico-a';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../../../environments/environment';
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
   pdf!: SafeResourceUrl;
     constructor(private sanitizer: DomSanitizer) {}

     ngOnInit() {
      console.log("id_admin ",localStorage.getItem("id_rol"))
      // vienes navegando con: this.router.navigate(['...'], { state: { paciente }})
      this.medico = history.state.medico as PerfilModelo;
      console.log('Paciente completo:', this.medico);
       if (this.medico && this.medico.matricula) {
      const pdfUrl = this.medico.matricula;
      this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    } else {
      console.warn('No se encontró la matrícula o el médico');
    }
    }
    activarMedico(){
      this.activarEndpoint();
          this.router.navigate(['administrador/medicos/activos']);

    }
    activarEndpoint(){
      const activarUrl=`${environment.apiUrl}/administradores/medico/activar/${this.medico.id}`;
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
