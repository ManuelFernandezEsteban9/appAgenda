import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable } from 'rxjs';
import { ClienteEntity } from '../../../domain/entities/cliente.entity';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-busqueda-clientes',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './busqueda-clientes.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusquedaClientesComponent implements AfterViewInit  {

  displayedColumns: string[] = ['nombre', 'telefonoPrincipal', 'tipoCliente', 'horario'];

  clienteService = inject(ClienteService);
  dataSource: any;

  constructor() {
    this.clienteService.getAllClientes().subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
    }
    )
  }
  ngAfterViewInit(): void {
    this.clienteService.getAllClientes().subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
    }
    )
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
