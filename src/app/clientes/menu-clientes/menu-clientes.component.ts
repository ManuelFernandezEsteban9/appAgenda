import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { NuevoClienteComponent } from '../nuevo-cliente/nuevo-cliente.component';
import { EditarClientesComponent } from "../editar-clientes/editar-clientes.component";

@Component({
  selector: 'app-menu-clientes',
  standalone: true,
  imports: [
    CommonModule, MatTabsModule, NuevoClienteComponent,
    EditarClientesComponent
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
