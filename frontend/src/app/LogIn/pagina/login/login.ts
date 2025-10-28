import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  usuarios = [
    { usuario: 'drjd', contrasenia: '123', rol: 'medico' },
    { usuario: 'admin', contrasenia: '321', rol: 'administrador' },
    { usuario: 'usuario', contrasenia: '456', rol: 'paciente' }
  ];

  private fb = new FormBuilder();
  loading = signal(false);

  constructor(private router: Router) {}

  form = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],

    contrasenia: ['', [Validators.required, Validators.minLength(3)]],
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

    const { usuario, contrasenia } = this.form.value;
    const encontrado = this.usuarios.find(u => u.usuario === usuario && u.contrasenia === contrasenia);

    setTimeout(() => {
      this.loading.set(false);
      if (!encontrado) {
        alert('Usuario o contraseña incorrectos');
        return;
      }

      if (encontrado.rol === 'medico') this.router.navigateByUrl('/medico/pacientes');
      else if (encontrado.rol === 'administrador') this.router.navigateByUrl('/administrador/pacientes/activos');
      else this.router.navigateByUrl('/paciente/mis-registros');
    }, 400);
  }

  // NUEVOS MÉTODOS para redirección a registros
  irARegistroPaciente() {
    this.router.navigate(['/solicitar-paciente']);
  }

  irARegistroMedico() {
    this.router.navigate(['/solicitar-medico']);
  }

  get f() { return this.form.controls; }
}
