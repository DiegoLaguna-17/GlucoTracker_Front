import { Component } from '@angular/core';
import { CardAdminA } from '../componentes/card-admin-a/card-admin-a';
import { PerfilAdmin } from '../componentes/card-admin-a/card-admin-a';
@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
    administrador: any;
  
    ngOnInit() {
      this.administrador = (history.state?.administrador as PerfilAdmin) ?? null;
      // fallback básico si entraron directo (sin state)
      console.log(this.administrador)
    }
}
