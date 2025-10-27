import { Component ,OnInit} from '@angular/core';
import { PerfilModelo } from '../../componentes/card-medico-a/card-medico-a';
@Component({
  selector: 'app-detalle-medico-activo',
  imports: [],
  templateUrl: './detalle-medico-activo.html',
  styleUrl: './detalle-medico-activo.scss',
})
export class DetalleMedicoActivo {
  medico!: PerfilModelo;
     ngOnInit() {
      // vienes navegando con: this.router.navigate(['...'], { state: { paciente }})
      this.medico = history.state.medico as PerfilModelo;
      console.log('Paciente completo:', this.medico);
    }
} 
