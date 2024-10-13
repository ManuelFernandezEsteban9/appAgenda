import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { ClienteNuevoDto } from '../../../domain/dtos/nuevo_cliente.dto';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Tipo{
  value:string;
  viewValue:string;
}
interface DialogData{
  name:string;
}

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [
    CommonModule,MatButtonModule,MatSelectModule,MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
  ],
  templateUrl: './editar-clientes.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarClientesComponent { 
  clienteABuscar:string='';
  tiposClientes: Tipo[] = [
    {value: 'CLIENTE', viewValue: 'CLIENTE'},
    {value: 'PRECLIENTE', viewValue: 'PRECLIENTE'},
    {value: 'PROSPECTO', viewValue: 'PROSPECTO'},
  ];

  nuevoClienteForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),    
    telefonoPrincipal: new FormControl('', [Validators.required]),    
    horario:new FormControl(''),
    tipoCliente:new FormControl('',[Validators.required])
  })

  matcher = new MyErrorStateMatcher();

  reset(){
    this.nuevoClienteForm.reset();
  }

  isValid(){
    return this.nuevoClienteForm.valid
  }

  onSubmit(){}
}
