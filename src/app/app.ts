import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookiesComponent } from './components/cookies-component/cookies-component';
import { FechaHoraComponent } from './components/fecha-hora-component/fecha-hora-component';
import { HistorialComponent } from './components/historial-component/historial-component';
import { LocalstorageComponent } from './components/localstorage-component/localstorage-component';
import { NumeroAleatorioComponent } from './components/numero-aleatorio-component/numero-aleatorio-component';
import { VentanaComponent } from './components/ventana-component/ventana-component';

@Component({
  imports: [RouterOutlet,
    CookiesComponent,
    FechaHoraComponent,
    HistorialComponent,
    LocalstorageComponent,
    NumeroAleatorioComponent,
    VentanaComponent,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('UT3EntregaEvaluable');
}
