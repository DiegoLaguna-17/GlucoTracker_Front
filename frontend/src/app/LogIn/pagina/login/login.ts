import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
 

  private fb = new FormBuilder();
  loading = signal(false);

  constructor(private router: Router,private http: HttpClient) {}

  form = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],

    contrasena: ['', [Validators.required, Validators.minLength(3)]],
  });

  // Método (no signal) que consulta el estado actual del form
  canSubmit() {
    return this.form.valid && !this.loading();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    const { usuario, contrasena } = this.form.value;
     const datos = {
      correo:this.form.value.usuario,
      contrasena:this.form.value.contrasena
     }

    this.http.post<any>(environment.apiUrl+'/login', datos)
      .subscribe({
        next: (res) => {
          console.log('Login exitoso:', res);

          // Guardar datos en localStorage (opcional)
          localStorage.setItem('id_usuario', res.id_usuario);
          localStorage.setItem('id_rol', res.id_rol);
          localStorage.setItem('rol', res.rol);

          // Redirigir según rol
          if (res.rol === 'administrador') {
            this.router.navigate(['/administrador']);
          } else if (res.rol === 'medico') {
            this.router.navigate(['/medico']);
          } else {
            this.router.navigate(['/paciente']);
          }
          
        },
        error: (err) => {
          console.error('Error de login:', err);
          alert(err.error?.error || 'Error al iniciar sesión');
        }
      });

      this.loading.set(false);
    
  }

  // NUEVOS MÉTODOS para redirección a registros
  irARegistroPaciente() {
    this.router.navigate(['/solicitar-paciente']);
  }

  irARegistroMedico() {
    this.router.navigate(['/solicitar-medico']);
  }

  ejecutarLogin(){
    
  }

  get f() { return this.form.controls; }


  ngOnInit(): void {
    localStorage.clear();
  }
}
