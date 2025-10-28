import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-agregar',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.scss',
})
export class Agregar {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.adminForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      cargo: ['', Validators.required]
    });
  }

  registrar() {
    if (this.adminForm.valid) {
      // Obtener la fecha de hoy
      const fechaHoy = new Date().toISOString().split('T')[0];
      
      // Crear el objeto con los datos para enviar al backend
      const datosParaBackend = {
        ...this.adminForm.value,
        fecha_registro: fechaHoy,
        administrador_id_admin: 1
      };

      console.log('Datos a enviar al backend:', datosParaBackend);
      
      // Llamar al método para enviar al backend
      this.enviarAlBackend(datosParaBackend);
      
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  enviarAlBackend(datos: any) {
    // AQUI VA LA URL DEL ENPOINT DEL KAWI
    const url = 'https://tu-backend.com/api/administradores';
    
    this.http.post(url, datos).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        alert('Administrador registrado exitosamente');
        this.adminForm.reset();
      },
      error: (error) => {
        console.error('Error al enviar al backend:', error);
        alert('Error al registrar administrador. Por favor, intente nuevamente.');
      }
    });
  }
}