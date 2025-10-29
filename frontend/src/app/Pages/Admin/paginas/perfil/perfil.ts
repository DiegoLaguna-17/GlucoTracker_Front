import { Component,inject,OnInit } from '@angular/core';
import { CardAdminA } from '../componentes/card-admin-a/card-admin-a';
import { PerfilAdmin } from '../componentes/card-admin-a/card-admin-a';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit{
    administrador!: PerfilAdmin;
    idUsuario=localStorage.getItem('id_usuario');
    private http = inject(HttpClient);
    ngOnInit() {
      this.cargarPerfil();
      // fallback básico si entraron directo (sin state)
    }
    cargarPerfil(){
      this.http.get<any>(`http://localhost:3000/perfil_admin/${this.idUsuario}`)
  .subscribe({
    next: (data) => {
      this.administrador = {
        id: data.id.toString(),
        nombre: data.nombre,
        correo: data.correo,
        fechaNac: data.fechanac,       // mapear fechanac → fechaNac
        telefono: data.telefono,
        cargo: data.cargo,
        fechaIn: data.fechain,         // mapear fechain → fechaIn
        admitidoPor: data.admitidopor  // mapear admitidopor → admitidoPor
      };
      console.log('Administrador:', this.administrador);
    },
    error: (err) => console.error('Error al obtener administrador:', err)
  });
    }
}
