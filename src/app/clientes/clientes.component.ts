import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { ClienteEntity } from '../../domain/entities/clientesResponse';
import { ClienteService } from '../../services/cliente.service';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, ReactiveFormsModule,
    AsyncPipe, MatSelectModule,MatIconModule,MatFormFieldModule
  ],
  templateUrl: './clientes.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientesComponent implements OnInit {
  zonaCliente:string='';
  clienteService = inject(ClienteService);
  dataSource$!: Observable<ClienteEntity[]>;
  displayedColumns = ['nombre', 'tipoCliente', 'telefonoPrincipal', 'horario'];
  clickedRows = new Set();
  selectedTipoCliente: string = '';
  tipos: Tipo[] = [
    { value: 'CLIENTE', viewValue: 'Cliente' },
    { value: 'PRECLIENTE', viewValue: 'Pre cliente' },
    { value: 'PROSPECTO', viewValue: 'Prospecto' },
  ]
  zonaForm = new FormGroup({
    zonaClienteForm:new FormControl('')
  })
  constructor() {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.dataSource$ = this.clienteService.getAllClientes();



  }



}
