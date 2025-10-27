import { Component ,OnInit} from '@angular/core';
import { PerfilModelo } from '../../componentes/card-medico-a/card-medico-a';
@Component({
  selector: 'app-detalle-medico-solicitud',
  imports: [],
  templateUrl: './detalle-medico-solicitud.html',
  styleUrl: './detalle-medico-solicitud.scss',
})
export class DetalleMedicoSolicitud {
 medico!: PerfilModelo;
     ngOnInit() {
      // vienes navegando con: this.router.navigate(['...'], { state: { paciente }})
      this.medico = history.state.medico as PerfilModelo;
      console.log('Paciente completo:', this.medico);
    }
}
