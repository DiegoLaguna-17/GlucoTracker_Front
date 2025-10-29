import { Component,computed,signal ,inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardAdminA , PerfilAdmin} from '../../componentes/card-admin-a/card-admin-a';
@Component({
  selector: 'app-admins-activos',
  imports: [CardAdminA,CommonModule],
  templateUrl: './admins-activos.html',
  styleUrl: './admins-activos.scss',
})
export class AdminsActivos {
  private router = inject(Router);
  administradores:PerfilAdmin[]=[
    {
    id:'2',
    nombre:'admin 2',
    correo:'admin2@gmail.com',
    fechaNac:'10/10/04',
    telefono:'2132165',
    cargo:'Admin',
    fechaIn:'10/10/2025',
    admitidoPor:' Admin 1'
  }
  ];
  q = signal<string>('');
    
      // lista filtrada (por nombre o CI)
       // Computed para la lista filtrada
      adminsFiltrados = computed(() => {
        const query = this.q().toLowerCase();
        return this.administradores.filter(p => 
          p.nombre.toLowerCase().includes(query) ||
          p.id.includes(query)
        );
      });
      verAdmin(m: PerfilAdmin){
        this.router.navigate(['administrador/administradores/activos/detalle'], { state: { admin: m } });

      }
   
  
  
      
}
