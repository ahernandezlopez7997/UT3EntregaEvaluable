import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-historial-component',
  styleUrl: './historial-component.css',
  templateUrl: './historial-component.html',
})
export class HistorialComponent implements OnInit {

  // Declaracion de variables
  colores = ['#ffffff', '#ff6b6b', '#4dabf7', '#51cf66', '#ffd43b', '#b197fc'];
  historialColores: string[] = [this.colores[0]];
  indice = 0;
  mensaje = ''; // Mensaje para avisos

  ngOnInit(): void {
    const historialGuardado = this.leer();
    const estadoIndice = history.state?.indice;

    // Aqui se realiza la comprobacion de si hay historial guardado
    if (
      historialGuardado &&
      Number.isInteger(estadoIndice) &&
      estadoIndice >= 0 &&
      estadoIndice < historialGuardado.length
    ) {
      // Recargando la pestaña: recuperamos historial
      this.historialColores = historialGuardado;
      this.indice = estadoIndice;
    } else {
      // Primera vez en la pestaña
      this.historialColores = [this.colores[0]];
      this.indice = 0;
      this.guardar();
      history.replaceState({ ...history.state, indice: this.indice }, '');
    }
  }

  // Lee los datos del historial de colores desde el sessionStorage
  private leer(): string[] | null {
    try {
      const datos = JSON.parse(sessionStorage.getItem('historial-de-colores')?? 'null');
      return Array.isArray(datos) && datos.length ? datos : null;
    } catch {
      return null;
    }
  }

  // Guarda los datos del historial de colores en el sessionStorage
  private guardar(): void {
    try {
      sessionStorage.setItem('historial-de-colores', JSON.stringify(this.historialColores));
    } catch {
      // SessionStorage no disponible
    }
  }

  // Metodo que selecciona un color del historial y actualiza el índice
  seleccionarColor(color: string): void {
    if (color === this.historialColores[this.indice]) return;

    this.mensaje = '';
    this.historialColores = [
      ...this.historialColores.slice(0, this.indice + 1),
      color,
    ];
    this.indice = this.historialColores.length - 1;
    this.guardar();
    history.pushState({...history.state, indice: this.indice}, '');
  }

  atras(): void {
    if (this.indice > 0) {
      history.back();
    }
  }

  adelante(): void {
    if (this.indice < this.historialColores.length - 1) {
      history.forward();
    }
  }

  // Retrocede X cambios que ha tenido el usuario
  retroceder(valor: string): void {
    const x = Number(valor);
    if (!Number.isInteger(x) || x < 1) {
      this.mensaje = `Introduce un número mayor que 0.`;
      return;
    }
    if (x > this.indice) {
      this.mensaje = `No puedes retroceder más de ${this.indice} cambios.`;
      return;
    }
    this.mensaje = '';
    history.go(-x); // Retrocede X cambios
  }

  // Esto es un listener para el evento popstate del historial
  @HostListener('window:popstate', ['$event'])
  // PopState es un evento que se dispara cuando el usuario retrocede o avanza en el historial del navegador
  onPopState(event: PopStateEvent): void {
    const i = event.state?.indice;
    if (Number.isInteger(i) && i >= 0 && i < this.historialColores.length) {
      this.indice = i;
      this.mensaje = '';
    }
  }

}
