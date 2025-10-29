import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-glucosa',
  imports: [CommonModule],
  templateUrl: './card-glucosa.html',
  styleUrl: './card-glucosa.scss',
})
export class CardGlucosaComponent {
  @Input() registro: any;
  @Output() verDetalle = new EventEmitter<any>();

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  getMomentoDiaTexto(momento: string): string {
    const momentos: { [key: string]: string } = {
      'ayunas': 'Ayunas',
      'tarde': 'Tarde',
      'noche': 'Noche'
    };
    return momentos[momento] || momento;
  }

  onVerDetalle() {
    this.verDetalle.emit(this.registro);
  }
}