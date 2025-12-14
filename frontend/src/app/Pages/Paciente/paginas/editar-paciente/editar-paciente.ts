import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

export interface PacienteData {
  nombre: string;
  id: string;
  fechaNac: string;
  genero: string;
  altura: string;
  peso: string;
  telefono: string;
  correo: string;
  actividadFisica: {
    nivel: 'Baja' | 'Moderada' | 'Alta';
    descripcion: string;
  };
  afecciones: string[];
  tratamientos: Treatment[];
  admitidoPor: string;
  embarazo: boolean;
  nombre_emergencia: string;
  numero_emergencia: string;
  foto_perfil: string;
}

export interface Treatment {
  titulo: string;
  descripcion: string;
  dosis: string;
}

@Component({
  selector: 'app-editar-paciente',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './editar-paciente.html',
  styleUrl: './editar-paciente.scss'
})
export class EditarPaciente implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  pacienteId!: string;
  pacienteData!: PacienteData;
  loading = false;
  guardando = false;
  
  // Signals para modales
  showSuccessModal = signal(false);
  showErrorModal = signal(false);
  errorMessage = signal('');
  showConfirmModal = signal(false);
  
  // Formulario principal
  formPaciente: FormGroup;
  
  // Variables para manejar afecciones
  nuevaAfeccion = '';
  afeccionesEditando: string[] = [];
  
  constructor() {
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      altura: ['', [Validators.required, Validators.pattern(/^\d+(,\d{1,2})?$/)]],
      peso: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      embarazo: [false],
      nombre_emergencia: ['', [Validators.required]],
      numero_emergencia: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,}$/)]],
      actividadFisica_nivel: ['Baja', [Validators.required]],
      actividadFisica_descripcion: ['', [Validators.required]]
      // NOTA: admitidoPor se eliminó porque NO debe cambiarse
    });
  }
  
  ngOnInit() {
    // Obtener ID del paciente desde localStorage
    this.pacienteId = localStorage.getItem('id_rol') || '';
    
    if (!this.pacienteId) {
      console.error('No se encontró ID de paciente');
      this.showError('No se encontró ID de paciente. Redirigiendo...');
      setTimeout(() => this.router.navigate(['/perfil']), 2000);
      return;
    }
    
    this.cargarPaciente();
  }
  
  cargarPaciente() {
    this.loading = true;
    const url = `${environment.apiUrl}/pacientes/perfil/${this.pacienteId}`;
    
    this.http.get<PacienteData>(url).subscribe({
      next: (data) => {
        this.pacienteData = data;
        this.cargarDatosEnFormulario();
        this.afeccionesEditando = [...data.afecciones];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar paciente:', err);
        this.loading = false;
        this.showError('Error al cargar datos del paciente: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  }
  
  cargarDatosEnFormulario() {
    // Convertir altura de cm a metros si es necesario
    let alturaEnMetros = this.pacienteData.altura;
    if (alturaEnMetros.includes('cm')) {
      const alturaCm = parseFloat(alturaEnMetros.replace(' cm', '').replace(' centímetros', ''));
      alturaEnMetros = (alturaCm / 100).toString().replace('.', ',');
    }
    
    this.formPaciente.patchValue({
      nombre: this.pacienteData.nombre,
      altura: alturaEnMetros,
      peso: this.pacienteData.peso.replace(' kg', '').replace(' Kilogramos', ''),
      telefono: this.pacienteData.telefono,
      correo: this.pacienteData.correo,
      embarazo: this.pacienteData.embarazo,
      nombre_emergencia: this.pacienteData.nombre_emergencia,
      numero_emergencia: this.pacienteData.numero_emergencia,
      actividadFisica_nivel: this.pacienteData.actividadFisica.nivel,
      actividadFisica_descripcion: this.pacienteData.actividadFisica.descripcion
      // admitidoPor no se carga porque es de solo lectura
    });
  }
  
  agregarAfeccion() {
    if (this.nuevaAfeccion.trim() && !this.afeccionesEditando.includes(this.nuevaAfeccion.trim())) {
      this.afeccionesEditando.push(this.nuevaAfeccion.trim());
      this.nuevaAfeccion = '';
    }
  }
  
  eliminarAfeccion(index: number) {
    this.afeccionesEditando.splice(index, 1);
  }
  
  prepararDatosParaEnvio(): any {
    const formValues = this.formPaciente.value;
    
    // Convertir altura de metros a cm para el backend
    const alturaEnCm = Math.round(parseFloat(formValues.altura.replace(',', '.')) * 100);
    
    return {
      nombre: formValues.nombre,
      altura: `${alturaEnCm} cm`,
      peso: `${formValues.peso} kg`,
      telefono: formValues.telefono,
      correo: formValues.correo,
      embarazo: formValues.embarazo,
      nombre_emergencia: formValues.nombre_emergencia,
      numero_emergencia: formValues.numero_emergencia,
      actividadFisica: {
        nivel: formValues.actividadFisica_nivel,
        descripcion: formValues.actividadFisica_descripcion
      },
      afecciones: this.afeccionesEditando,
      // Mantener campos que no se editan
      fechaNac: this.pacienteData.fechaNac,
      genero: this.pacienteData.genero,
      admitidoPor: this.pacienteData.admitidoPor, // No cambia
      tratamientos: this.pacienteData.tratamientos,
      foto_perfil: this.pacienteData.foto_perfil
    };
  }
  
  guardarCambios() {
    if (this.formPaciente.invalid) {
      this.marcarCamposComoTocados();
      return;
    }
    
    this.guardando = true;
    const datosActualizados = this.prepararDatosParaEnvio();
    const url = `${environment.apiUrl}/pacientes/actualizar/${this.pacienteId}`;
    
    this.http.put(url, datosActualizados).subscribe({
      next: (response) => {
        console.log('Paciente actualizado:', response);
        this.guardando = false;
        this.showSuccessModal.set(true);
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.showSuccessModal.set(false);
          this.router.navigate(['/paciente/perfil']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al actualizar paciente:', err);
        this.guardando = false;
        this.showError('Error al guardar cambios: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  }
  
  confirmarCancelar() {
    this.showConfirmModal.set(true);
  }
  
  cancelar() {
    this.showConfirmModal.set(false);
    this.router.navigate(['/paciente/perfil']);
  }
  
  closeConfirmModal() {
    this.showConfirmModal.set(false);
  }
  
  marcarCamposComoTocados() {
    Object.keys(this.formPaciente.controls).forEach(key => {
      const control = this.formPaciente.get(key);
      control?.markAsTouched();
    });
  }
  
  showError(mensaje: string) {
    this.errorMessage.set(mensaje);
    this.showErrorModal.set(true);
  }
  
  closeErrorModal() {
    this.showErrorModal.set(false);
    this.errorMessage.set('');
  }
  
  closeSuccessModal() {
    this.showSuccessModal.set(false);
    this.router.navigate(['/perfil']);
  }
  
  // Getter para acceder a los controles del formulario
  get f(): { [key: string]: FormControl } {
    return this.formPaciente.controls as { [key: string]: FormControl };
  }
  
  get nivelesActividad() {
    return ['Baja', 'Moderada', 'Alta'];
  }
}