import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitar-paciente',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './solicitar-paciente.html',
  styleUrl: './solicitar-paciente.scss'
})
export class SolicitarPacienteComponent implements OnInit{
  pacienteForm: FormGroup;
  medicos:any[]=[];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.pacienteForm = this.fb.group({
      // Datos personales
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

      // Datos médicos
      genero: ['', Validators.required],
      embarazada: [''],
      peso: ['', [Validators.required, Validators.min(0)]],
      altura: ['', [Validators.required, Validators.min(0)]],

      // Primera enfermedad
      enfermedad1: [''],
      tratamiento1: [''],
      dosis1: [''],
      descripcion1: [''],

      // Segunda enfermedad
      enfermedad2: [''],
      tratamiento2: [''],
      dosis2: [''],
      descripcion2: [''],

      // Credenciales
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método para manejar cambio de género
  onGeneroChange() {
    const genero = this.pacienteForm.get('genero')?.value;
    
    if (genero !== 'mujer') {
      // Si no es mujer, limpia el campo embarazada
      this.pacienteForm.patchValue({ embarazada: '' });
    }
  }

  enviarSolicitud() {
    if (this.pacienteForm.valid) {
      // Preparar datos para enviar
      const datosParaBackend = {
        ...this.pacienteForm.value,
        administrador_id_admin: 1,
        fecha_registro: new Date().toISOString().split('T')[0],
        estado: 'pendiente'
      };

      console.log('Datos a enviar al backend:', datosParaBackend);
      
      // Enviar al backend
      this.enviarAlBackend(datosParaBackend);
      
    } else {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
    }
  }

  enviarAlBackend(datos: any) {
    // URL de tu endpoint - CAMBIA ESTA URL
    const url = 'https://tu-backend.com/api/solicitudes-paciente';
    
    this.http.post(url, datos).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        alert('Paciente registrado exitosamente');
        this.pacienteForm.reset();
      },
      error: (error) => {
        console.error('Error al enviar solicitud:', error);
        alert('Error al registrar paciente. Por favor, intente nuevamente.');
      }
    });
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(){
    const urlMedicos = 'http://localhost:3000/ver_medicos';

    this.http.get<any[]>(urlMedicos).subscribe({
      next: (data) => {
        this.medicos = data;
        console.log('Médicos recibidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener médicos:', err);
      }
    });
    console.log(this.medicos)
  }
}