import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-medico',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './solicitar-medico.html',
  styleUrl: './solicitar-medico.scss'
})
export class SolicitarMedicoComponent {
  medicoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.medicoForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      departamento: ['', Validators.required],
      matriculaProfesional: [null, Validators.required],
      carnetProfesional: [null, Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  // Manejar selección de archivos
  onFileSelected(event: any, tipo: string) {
    const file = event.target.files[0];
    if (file) {
      if (tipo === 'matricula' && file.type !== 'application/pdf') {
        alert('Por favor, seleccione un archivo PDF para la matrícula profesional');
        return;
      }
      
      if (tipo === 'carnet' && !file.type.match(/image\/(jpg|jpeg|png)/)) {
        alert('Por favor, seleccione una imagen JPG o PNG para el carnet profesional');
        return;
      }

      this.medicoForm.patchValue({
        [tipo === 'matricula' ? 'matriculaProfesional' : 'carnetProfesional']: file
      });
    }
  }

  // Obtener nombre del archivo para mostrar
  getFileName(file: File): string {
    return file ? file.name : '';
  }

  enviarSolicitud() {
    if (this.medicoForm.valid) {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(this.medicoForm.value).forEach(key => {
        if (this.medicoForm.value[key]) {
          formData.append(key, this.medicoForm.value[key]);
        }
      });

      // Agregar campos automáticos
      formData.append('administrador_id_admin', '1');
      formData.append('fecha_solicitud', new Date().toISOString().split('T')[0]);
      formData.append('estado', 'pendiente');

      console.log('Datos a enviar:', Object.fromEntries(formData));
      
      // Enviar al backend
      this.enviarAlBackend(formData);
      
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  enviarAlBackend(formData: FormData) {
    // URL de tu endpoint - CAMBIA ESTA URL
    const url = 'https://tu-backend.com/api/solicitudes-medico';
    
    this.http.post(url, formData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        alert('Solicitud enviada exitosamente');
        this.medicoForm.reset();
      },
      error: (error) => {
        console.error('Error al enviar solicitud:', error);
        alert('Error al enviar solicitud. Por favor, intente nuevamente.');
      }
    });
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }
}