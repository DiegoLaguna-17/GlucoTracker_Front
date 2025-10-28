import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.scss',
})
export class Agregar {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  registrar() {
    if (this.adminForm.valid) {
      console.log('Administrador registrado:', this.adminForm.value);
      alert('Administrador registrado exitosamente');
      this.adminForm.reset();
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}
