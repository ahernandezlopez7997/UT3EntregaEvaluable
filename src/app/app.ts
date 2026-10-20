import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ejercicio1 } from './components/ejercicio1/ejercicio1';
import { Ejercicio2 } from './components/ejercicio2/ejercicio2';
import { Ejercicio3 } from './components/ejercicio3/ejercicio3';
import { Ejercicio4 } from './components/ejercicio4/ejercicio4';
import { Ejercicio5 } from './components/ejercicio5/ejercicio5';
import { Ejercicio6 } from './components/ejercicio6/ejercicio6';

@Component({
  imports: [RouterOutlet, Ejercicio1, Ejercicio2, Ejercicio3, Ejercicio4, Ejercicio5, Ejercicio6],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('UT3EntregaEvaluable');
}
