import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-glucosa',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registrar-glucosa.html',
  styleUrl: './registrar-glucosa.scss',
})
export class RegistrarGlucosa {
  glucosaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.glucosaForm = this.fb.group({
      quienTomaMuestra: ['', Validators.required],
      nivelGlucosa: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      momentoDia: ['', Validators.required],
      observaciones: ['']
    });
  }

  registrarGlucosa() {
    if (this.glucosaForm.valid) {
      // Obtener fecha y hora actual
      const fechaActual = new Date();
      const fecha = fechaActual.toISOString().split('T')[0]; // Solo fecha: "2024-01-15"
      const hora = fechaActual.toTimeString().split(' ')[0]; // Solo hora: "14:30:25"

      // Preparar datos para enviar al backend
      const datosParaBackend = {
        ...this.glucosaForm.value,
        fecha: fecha,
        hora: hora,
        paciente_id: 1, // Cambiar por el ID real del paciente
        estado: 'registrado'
      };

      console.log('Datos a enviar al backend:', datosParaBackend);
      
      // Enviar al backend
      this.enviarAlBackend(datosParaBackend);
      
    } else {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
      this.glucosaForm.markAllAsTouched();
    }
  }

  enviarAlBackend(datos: any) {
    // URL de tu endpoint - CAMBIA ESTA URL
    const url = 'https://tu-backend.com/api/registros-glucosa';
    
    this.http.post(url, datos).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        alert('Glucosa registrada exitosamente');
        this.glucosaForm.reset();
      },
      error: (error) => {
        console.error('Error al registrar glucosa:', error);
        alert('Error al registrar glucosa. Por favor, intente nuevamente.');
      }
    });
  }
}