import {Component, OnInit, OnDestroy, signal} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-fecha-hora-component',
  styleUrl: './fecha-hora-component.css',
  templateUrl: './fecha-hora-component.html',
})
export class FechaHoraComponent implements OnInit, OnDestroy {
  // Declaramos variables
  fecha = signal(new Date());
  formatoHoras = true;
  mostrarReloj = false;
  zonaHoraria = 'Europe/Madrid';
  private intervalo?: ReturnType<typeof setInterval>;

  // Este proceso inicia y actualiza la fecha cada segundo
  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.fecha.set(new Date());
    }, 1000); // Recuerda que son 1000 milisegundos
  }

  // Este proceso elimina el intervalo de tiempo cuando el componente se destruye
  ngOnDestroy(): void {

    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  // Cambia el formato de la fecha 12/24H
  cambiarFormato(event: Event): void {
    this.formatoHoras = (event.target as HTMLInputElement).checked;
  }

  // Muestra u oculta el reloj
  cambiarVisibilidadReloj(event: Event): void {
    this.mostrarReloj = (event.target as HTMLInputElement).checked;
  }

  // Metodo para cambiar la zona horaria
  cambiarZonaHoraria(event: Event): void {
    this.zonaHoraria = (event.target as HTMLSelectElement).value;
  }

  // Metodo para formatear la fecha
  formatearFecha(fecha: Date, zona?: string): string {
    return new Intl.DateTimeFormat('es-ES', {
      timeZone: zona,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: this.formatoHoras ? 'h23' : 'h12',
    }).format(fecha);
  }
}
