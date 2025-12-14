import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {


  private fb = new FormBuilder();
  loading = signal(false);

  // Variables para los modales
  showVerificationModal = signal(false);
  showSuccessModal = signal(false);
  showErrorModal = signal(false);
  errorMessage = signal('');

  // Variable para guardar las credenciales temporalmente
  private loginCredentials: { correo: string, contrasena: string } | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  form = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    
    contrasena: ['', [Validators.required, Validators.minLength(3)]],
  });


  canSubmit() {
    return this.form.valid && !this.loading();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    // Guardar las credenciales temporalmente
    this.loginCredentials = {
      correo: this.form.value.usuario || '',
      contrasena: this.form.value.contrasena || ''
    };

    // Mostrar modal de verificación
    this.showVerificationModal.set(true);
    this.loading.set(false);
  }

  // Método para verificar el código y hacer el login real
  verifyAndLogin() {
    // Cerrar modal de verificación
    this.showVerificationModal.set(false);
    
    if (!this.loginCredentials) {
      console.error('No hay credenciales guardadas');
      this.showErrorModal.set(true);
      this.errorMessage.set('Error interno: credenciales no encontradas');
      return;
    }

    // Mostrar que estamos procesando (opcional)
    this.loading.set(true);

    // Hacer la llamada HTTP real con las credenciales guardadas
    this.http.post<any>(environment.apiUrl + '/login', this.loginCredentials)
      .subscribe({
        next: (res) => {
          console.log('Login exitoso:', res);

          // Guardar datos en localStorage
          localStorage.setItem('id_usuario', res.id_usuario);
          localStorage.setItem('id_rol', res.id_rol);
          localStorage.setItem('rol', res.rol);

          // Mostrar modal de éxito
          this.showSuccessModal.set(true);
          
          // Esperar 2 segundos y luego redirigir
          setTimeout(() => {
            this.showSuccessModal.set(false);
            
            // Redirigir según rol
            if (res.rol === 'administrador') {
              this.router.navigate(['/administrador']);
            } else if (res.rol === 'medico') {
              this.router.navigate(['/medico']);
            } else {
              this.router.navigate(['/paciente']);
            }
          }, 5000);
          
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error de login:', err);
          
          // Mostrar modal de error en lugar de alert
          this.showErrorModal.set(true);
          this.errorMessage.set(err.error?.error || 'Error al iniciar sesión');
          
          this.loading.set(false);
        }
      });
  }

  // Método para cancelar y limpiar credenciales
  cancelVerification() {
    this.showVerificationModal.set(false);
    this.loginCredentials = null;
  }

  // Método para cerrar modal de éxito inmediatamente
  closeSuccessModal() {
    this.showSuccessModal.set(false);
  }

  // Método para cerrar modal de error
  closeErrorModal() {
    this.showErrorModal.set(false);
    this.errorMessage.set('');
  }

  // Métodos para redirección a registros
  irARegistroPaciente() {
    this.router.navigate(['/solicitar-paciente']);
  }

  irARegistroMedico() {
    this.router.navigate(['/solicitar-medico']);
  }



  get f() { return this.form.controls; }


  ngOnInit(): void {
    localStorage.clear();
  }
}
