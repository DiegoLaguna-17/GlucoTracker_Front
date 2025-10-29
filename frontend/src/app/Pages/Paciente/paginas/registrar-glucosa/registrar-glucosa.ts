import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-glucosa',
  standalone: true, // 👈 importante si usas componentes standalone
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './registrar-glucosa.html',
  styleUrls: ['./registrar-glucosa.scss'],
})
export class RegistrarGlucosa implements OnInit {

  glucosaForm: FormGroup;
  medicos: any[] = [];
  momentos: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.glucosaForm = this.fb.group({
      id_medico: ['', Validators.required],
      nivel_glucosa: ['', [Validators.required, Validators.min(0)]],
      id_momento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerMedicos();
    this.obtenerMomentos();
  }

  obtenerMedicos() {
    this.http.get<any[]>('https://gt-prueba-1.onrender.com/ver_medicos').subscribe({
       next: (data) => {
      // Asegura que tengas un array con id_medico y nombre_completo
      this.medicos = data.map(item => ({
        id_medico: item.id_medico,
        nombre_completo: item.usuario?.nombre_completo || 'Desconocido'
      }));
      console.log('Médicos cargados:', this.medicos);
      },
      error: (err) => console.error('Error al obtener médicos:', err)
    });
  }

  obtenerMomentos() {
    this.http.get<any[]>('https://gt-prueba-1.onrender.com/ver_momentos').subscribe({
      next: (data) => {
        this.momentos = data;
        console.log('Momentos cargados:', this.momentos);
      },
      error: (err) => console.error('Error al obtener momentos:', err)
    });
  }

  registrarGlucosa() {
    if (this.glucosaForm.valid) {
      const fechaActual = new Date();
      const fecha = fechaActual.toISOString().split('T')[0];
      const hora = fechaActual.toTimeString().split(' ')[0];

      const datosParaBackend = {
        ...this.glucosaForm.value,
        fecha,
        hora,
        id_paciente: localStorage.getItem('id_rol') // ⚠️ reemplaza por el ID real
      };

      console.log('Datos a enviar al backend:', datosParaBackend);
      this.enviarAlBackend(datosParaBackend)
    } else {
      alert('Por favor complete todos los campos correctamente.');
      this.glucosaForm.markAllAsTouched();
    }
  }

  enviarAlBackend(datos: any) {
    const url = 'https://gt-prueba-1.onrender.com/registrar_glucosa'; // cambia la URL real

    this.http.post(url, datos).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        alert('Glucosa registrada exitosamente ✅');
        this.glucosaForm.reset();
      },
      error: (error) => {
        console.error('Error al registrar glucosa:', error);
        alert('Error al registrar glucosa ❌');
      }
    });
  }
}
