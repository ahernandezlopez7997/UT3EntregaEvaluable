import { Component, OnDestroy } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ventana-component',
  styleUrl: './ventana-component.css',
  templateUrl: './ventana-component.html',
})
export class VentanaComponent implements OnDestroy{

  // Almacenar la referencia a la ventana emergente
  ventana: Window | null = null;
  private intervalo: any;

  // Metodo para abrir la ventana emergente
  abrirVentana() {
    // Si la ventana ya está abierta, no hacer nada
    if (this.ventana && !this.ventana.closed) {
      return;
    }
    // Sino abrir la ventana y almacenar la referencia
    this.ventana = window.open('', 'Ventan Emergente', 'width=400,height=400');
    this.intervalo = setInterval(() => {
      // Si la ventana se ha cerrado, limpiar la referencia y el intervalo
      if (this.ventana?.closed) {
        this.ventana = null;
        clearInterval(this.intervalo);
      }
    }, 500) // Comprobar cada 500 ms si la ventana se ha cerrado
  }

  // Metodo para mover la ventana
  moverVentana(x: number, y: number) {
    // Acordarse de que ? evita errores si la ventana es null
    this.ventana?.moveBy(x, y);
  }

  cerrarVentana() {
    this.ventana?.close();
    this.ventana = null;
    clearInterval(this.intervalo);
  }

  // Metodo para limpiar el intervalo cuando se destruye el componente
  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}
