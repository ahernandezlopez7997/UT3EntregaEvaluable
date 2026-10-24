import { Component, OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cookies-component',
  styleUrl: './cookies-component.css',
  templateUrl: './cookies-component.html',
})
export class CookiesComponent implements OnInit {
  nombre = '';
  visitas = 0;
  ultimaVisita = '';

  // Funcion paara guardar cookies
  private guardarCookie(clave: string, valor: string) {
    // Guardamos la cookie con una caducidad de 1 día
    document.cookie = `${clave}=${encodeURIComponent(valor)}; max-age=86400; path0=/`;
  }

  // Funcion para leer cookies
  private leerCookie(clave: string): string {
    // Buscamos la cookie con la clave especificada
    const  encontrada = document.cookie.split('; ')
      .find((cookie) => cookie.startsWith(clave + '='));
    // Si la encontramos, devolvemos su valor decodificado, si no, devolvemos una cadena vacía
    return encontrada ? decodeURIComponent(encontrada.substring(clave.length + 1)) : '';
  }

  // Funcion para borrar cookies
  private borrarCookie(clave: string) {
    document.cookie = `${clave}=; max-age=0; path=/`;
  }



  // Lee los datos de localStorage y se registra la visita al arrancar
  ngOnInit() {
    this.nombre = this.leerCookie('nombre');
    this.registrarVisita();
  }

  // Cuenta la visita actual y la guarda
  registrarVisita() {
    // Primero leer la visita anterior antes de pisarla
    this.ultimaVisita = this.leerCookie('ultimaVisita');
    this.visitas = Number(this.leerCookie('visitas')) + 1;

    // Guardamos los datos de la visita
    this.guardarCookie('visitas', String(this.visitas));
    this.guardarCookie('ultimaVisita', new Date().toLocaleString());
  }

  // Guardamos el nombre en localStorage
  guardarNombre(nombre: string) {
    if (!nombre.trim()) return;
    this.nombre = nombre.trim();
    this.guardarCookie('nombre', this.nombre);
  }

  // Borramos todos los datos
  borrarDatos() {
    this.borrarCookie('nombre');
    this.borrarCookie('visitas');
    this.borrarCookie('ultimaVisita');
    this.nombre = '';

    // La página sigue abierta, así que esta cuenta como la primera visita
    this.registrarVisita();
  }
}
