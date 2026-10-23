import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-numero-aleatorio-component',
  styleUrl: './numero-aleatorio-component.css',
  templateUrl: './numero-aleatorio-component.html',
})
export class NumeroAleatorioComponent {
  cantidad = 5;
  minimo = 1;
  maximo = 10;
  numerosRepetidos = true;
  numerosGenerados: number[] = [];
  error = '';

  // Metodo para seleccionar numeros a generar
  elegirCantidad(event: Event): void {
    this.cantidad = (event.target as HTMLInputElement).valueAsNumber;
  }

  // Metodo para seleccionar el valor minimo
  elegirMinimo(event: Event): void {
    this.minimo = (event.target as HTMLInputElement).valueAsNumber;
  }

  // Metodo para seleccionar el valor maximo
  elegirMaximo(event: Event): void {
    this.maximo = (event.target as HTMLInputElement).valueAsNumber;
  }

  // Metodo para permitir o no numeros repetidos
  permitirRepetidos(event: Event): void {
    this.numerosRepetidos = (event.target as HTMLInputElement).checked;
  }

  // Generador de números
  generarNumeros(): void {
    this.numerosGenerados = [];
    this.error = '';

    // Si la cantidad no es un entero mayor que cero
    if (!Number.isSafeInteger(this.cantidad) || this.cantidad < 1) {
      this.error = 'La cantidad debe ser un entero mayor que cero.';
      return;
    }

    // Si el mínimo y el máximo no son números enteros válidos
    if (!Number.isSafeInteger(this.minimo) || !Number.isSafeInteger(this.maximo)) {
      this.error = 'El mínimo y el máximo deben ser números enteros válidos.';
      return;
    }

    // Si el mínimo es mayor que el máximo
    if (this.minimo > this.maximo) {
      this.error = 'El mínimo no puede ser mayor que el máximo.';
      return;
    }

    const totalPosibles = this.maximo - this.minimo + 1;

    // Si el rango indicado es demasiado grande
    if (!Number.isSafeInteger(totalPosibles)) {
      this.error = 'El rango indicado es demasiado grande.';
      return;
    }

    // Si el número de elementos a generar es mayor que el total posible y no se permiten repetidos
    if (!this.numerosRepetidos && this.cantidad > totalPosibles) {
      this.error = `No se pueden extraer ${this.cantidad} números distintos entre ${this.minimo} y ${this.maximo}.`;
      return;
    }

    // Bucle para seleccionar números con repetición
    if (this.numerosRepetidos) {
      for (let i = 0; i < this.cantidad; i++) {
        this.numerosGenerados.push(
          Math.floor(Math.random() * totalPosibles) + this.minimo,
        );
      }
      return;
    }

    const seleccionados = new Set<number>();

    // Bucle para seleccionar números sin repetición
    for (let i = totalPosibles - this.cantidad; i < totalPosibles; i++) {
      const candidato = Math.floor(Math.random() * (i + 1));
      seleccionados.add(seleccionados.has(candidato) ? i : candidato);
    }
    this.numerosGenerados = Array.from(seleccionados, (numero) => numero + this.minimo);
  }
}
