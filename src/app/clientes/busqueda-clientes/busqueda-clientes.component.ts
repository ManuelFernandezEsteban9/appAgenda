import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-busqueda-clientes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './busqueda-clientes.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusquedaClientesComponent { }
