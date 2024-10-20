import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ClienteService } from '../../../services/cliente.service';
import {MatListModule} from '@angular/material/list';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { map, pipe, Observable } from 'rxjs';
import { ClienteEntity } from '../../../domain/entities/cliente.entity';
import { UpdateClienteDto } from '../../../domain/dtos/update_cliente.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../dialogs/dialog-success/dialog-success.component';
import { DialogErrorComponent } from '../../dialogs/dialog-error/dialog-error.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



interface Tipo {
  value: string;
  viewValue: string;
}
interface DialogData {
  name: string;
}

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatSelectModule, MatIconModule,MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatListModule
  ],
  templateUrl: './editar-clientes.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarClientesComponent implements OnInit {
  
  readonly dialog = inject(MatDialog);
  clienteService = inject(ClienteService);
  clientesFiltrados?: Observable<ClienteEntity[]> ;
  clienteABuscar: string = '';
  clientes: ClienteEntity[] = [];
  tiposClientes: Tipo[] = [
    { value: 'CLIENTE', viewValue: 'CLIENTE' },
    { value: 'PRECLIENTE', viewValue: 'PRECLIENTE' },
    { value: 'PROSPECTO', viewValue: 'PROSPECTO' },
  ];

  editarClienteForm = new FormGroup({
    id: new FormControl (0),
    nombre: new FormControl('', [Validators.required]),
    telefonoPrincipal: new FormControl('', [Validators.required]),
    horario: new FormControl(''),
    tipoCliente: new FormControl('', [Validators.required])
  })   

  busquedaClienteForm:FormGroup=new FormGroup({
    cliente: new FormControl()
  })

  matcher = new MyErrorStateMatcher();

  reset() {
    this.editarClienteForm.reset();
    this.clientesFiltrados=undefined;
  }

  isValid() {
    return this.editarClienteForm.valid
  }

  onSubmit() {
    console.log(this.editarClienteForm.value)
    
    if (this.editarClienteForm.valid===false) return;
    const [error,updateClienteDto] = UpdateClienteDto.create(this.editarClienteForm.value);

    

    if (error) {
      
      const dialogError = this.dialog.open(DialogErrorComponent,{
        data:{name:error}
      });
      dialogError.afterClosed().subscribe();
      return;      
    }

    this.clienteService.putCliente(updateClienteDto!)
      .subscribe(res=>{        
        const dialogSuccess = this.dialog.open(DialogSuccessComponent,{
          data:{name:`${res.nombre} ha sido editado correctamente`}          
        });
        dialogSuccess.afterClosed().subscribe(res=>console.log(res));
        this.reset();
      },
        err=>{
          const dialogError = this.dialog.open(DialogErrorComponent,{
            data:{name:err}
          });
          dialogError.afterClosed().subscribe();
        }
    )

  }

  buscarCliente() {

    this.clientesFiltrados= this.clienteService.getAllClientes()
      .pipe(
        map(clientes=>
          clientes.filter(c=>c.nombre.toLowerCase().includes(this.clienteABuscar.toLowerCase()))
        )
      )
       
  }

  onClickCliente(cliente:ClienteEntity){
    
    this.editarClienteForm.setValue({
      id:cliente.id,
      nombre:cliente.nombre,
      telefonoPrincipal:cliente.telefonoPrincipal,
      horario:cliente.horario||'',
      tipoCliente:cliente.tipoCliente
    })
  }

  ngOnInit(): void {

    this.clienteService
      .getAllClientes().subscribe(
        res => {
          this.clientes = res;
        }
      );

  }
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
}
