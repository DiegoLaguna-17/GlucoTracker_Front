import { Component,computed,signal ,inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardMedicoA,PerfilModelo } from '../../componentes/card-medico-a/card-medico-a';
@Component({
  selector: 'app-medicos-solicitudes',
  imports: [CommonModule,CardMedicoA],
  templateUrl: './medicos-solicitudes.html',
  styleUrl: './medicos-solicitudes.scss',
})
export class MedicosSolicitudes {
  private router = inject(Router); // solo para tipado, Angular lo inyecta en runtime si decides usarlo
  
    // Datos demo (cámbialos por tu fetch al backend)
    medicos: PerfilModelo[] = [
      {
    
     id: '1',
  nombre: 'Carlos Gomez',
  fechaNac: '2000-07-15',
  telefono: '79876543',
  correo: 'carlos.gomez@gmail.com',
  matricula: 'A12345',
  departamento: 'Informática',
  carnet: '1234567LP',
  admitidoPor: 'No'
  }
  
    ];
    // query de búsqueda
    q = signal<string>('');
  
    // lista filtrada (por nombre o CI)
     // Computed para la lista filtrada
    medicosFiltrados = computed(() => {
      const query = this.q().toLowerCase();
      return this.medicos.filter(p => 
        p.nombre.toLowerCase().includes(query) ||
        p.id.includes(query)
      );
    });
    verMedico(m: PerfilModelo){
      this.router.navigate(['administrador/medicos/solicitud/detalle'], { state: { medico: m } });


    }

}
