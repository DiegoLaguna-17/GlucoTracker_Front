import { Component,computed,signal ,inject} from '@angular/core';
import { PacienteCard ,PacienteResumen} from '../../componentes/paciente-card/paciente-card';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pacientes',
  imports: [PacienteCard,CommonModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.scss',
})
export class Pacientes {
  private router = inject(Router); // solo para tipado, Angular lo inyecta en runtime si decides usarlo

  // Datos demo (cámbialos por tu fetch al backend)
  pacientes: PacienteResumen[] = [
    {
  id: 1,
  nombre: "Carlos Gomez",
  ci: "carlos.gomez@gmail.com",
  fechaNac: "15/07/2000",
  genero: "Masculino",
  peso: '75.5',
  altura: '1.78',
  actividadFisica:'2 veces por semana',
  telefono: "79876543",
  Correo: "carlos.gomez@gmail.com",
  afecciones: [
    { afeccion: "Diabetes tipo 2" },
    { afeccion: "Hipotiroidismo" }
  ],
  tratamientos: [
    { titulo: "Metformina", desc: "Tratamiento para diabetes tipo 2", dosis:' 500.00' },
    { titulo: "Levotiroxina", desc: "Tratamiento para hipotiroidismo", dosis: '75.00' }
  ],
  historial: [
    {
      fecha: "26/10/2025",
      registros: [
        {
          fecha: "26/10/2025",
          hora: "07:30",
          momento: "Ayunas",
          glucosa: '110.50',
          alerta: null
        },
        {
          fecha: "26/10/2025",
          hora: "09:00",
          momento: "Desayuno",
          glucosa:' 140.00',
          alerta: {
            nivel: "Hiperglucemia",
            observacion: "Alerta detectada"
          }
        }
      ]
    },
    {
      fecha: "26/10/2025",
      registros: [
        {
          fecha: "26/10/2025",
          hora: "07:30",
          momento: "Ayunas",
          glucosa: '110.50',
          alerta: null
        },
        {
          fecha: "26/10/2025",
          hora: "09:00",
          momento: "Desayuno",
          glucosa: '140.00',
          alerta: {
            nivel: "Hiperglucemia",
            observacion: "Alerta detectada"
          }
        }
      ]
    }
  ]
}

  ];
  // query de búsqueda
  q = signal<string>('');

  // lista filtrada (por nombre o CI)
   // Computed para la lista filtrada
  pacientesFiltrados = computed(() => {
    const query = this.q().toLowerCase();
    return this.pacientes.filter(p => 
      p.nombre.toLowerCase().includes(query) ||
      p.ci.includes(query)
    );
  });
  verPaciente(p: PacienteResumen){
  this.router.navigate(['/medico/detalle-paciente'], { state: { paciente: p } });}

  
}
