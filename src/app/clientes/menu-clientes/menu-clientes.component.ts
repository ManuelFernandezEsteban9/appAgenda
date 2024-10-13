import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { NuevoClienteComponent } from '../nuevo-cliente/nuevo-cliente.component';

@Component({
  selector: 'app-menu-clientes',
  standalone: true,
  imports: [
    CommonModule,MatTabsModule,NuevoClienteComponent
  ],
  templateUrl: './menu-clientes.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuClientesComponent { }
