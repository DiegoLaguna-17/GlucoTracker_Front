import { Component,computed,signal ,inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
export interface Auditoria{
  id:number,
  id_usuario:number,
  rol:string,
  id_rol:number,
  enpoint:string,
  operacion:string,
  exito:boolean,
  codigo_http:number,
  ip_origen:string,
  fecha:Date
}
@Component({
  selector: 'app-auditoria',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.scss',
})
export class Auditoria {
  private router = inject(Router);
   constructor(
    private http: HttpClient
  ){}
  registros:Auditoria[]=[];
  ngOnInit(){
    //this.obtenerAuditoria();
  }
  
  obtenerAuditoria(){
    const url=``;
    this.http.get<Auditoria[]>(url).subscribe({
      next:(response)=>{
        this.registros=(response);
        console.log(this.registros)
      },
      error:(err)=>{
        console.log("Error al obtener auditoria ",err)
      }
    })
  }
}
