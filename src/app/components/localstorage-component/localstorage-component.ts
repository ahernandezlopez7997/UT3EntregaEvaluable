import { Component, OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-localstorage-component',
  styleUrl: './localstorage-component.css',
  templateUrl: './localstorage-component.html',
})
export class LocalstorageComponent implements OnInit {
  nombre = '';
  visitas = 0;
  ultimaVisita = '';

  // Lee los datos de localStorage y se registra la visita al arrancar
  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') ?? '';
    this.registrarVisita();
  }

  // Cuenta la visita actual y la guarda
  registrarVisita() {
    // Primero leer la visita anterior antes de pisarla
    this.ultimaVisita = localStorage.getItem('ultimaVisita') ?? '';
    this.visitas = Number(localStorage.getItem('visitas')) + 1;

    // Guardamos los datos de la visita
    localStorage.setItem('visitas', String(this.visitas));
    localStorage.setItem('ultimaVisita', new Date().toLocaleString());
  }

  // Guardamos el nombre en localStorage
  guardarNombre(nombre: string) {
    if (!nombre.trim()) return;
    this.nombre = nombre.trim();
    localStorage.setItem('nombre', this.nombre);
  }

  // Borramos todos los datos
  borrarDatos() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('visitas');
    localStorage.removeItem('ultimaVisita');
    this.nombre = '';

    // La página sigue abierta, así que esta cuenta como la primera visita
    this.registrarVisita();
  }
}
