import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ClienteService } from '../../../services/cliente.service';
import { DialogSuccessComponent } from '../../dialogs/dialog-success/dialog-success.component';
import { DialogErrorComponent } from '../../dialogs/dialog-error/dialog-error.component';

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
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [
    CommonModule,MatButtonModule,MatSelectModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
  ],
  templateUrl: './nuevo-cliente.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevoClienteComponent {
  readonly dialog = inject(MatDialog);
  private serviceCliente = inject(ClienteService);

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

  onSubmit(){
    console.log(this.nuevoClienteForm.value);

    if (this.nuevoClienteForm.valid===false) return;
    const [error,nuevoClienteDto] = ClienteNuevoDto.create(this.nuevoClienteForm.value);

    

    if (error) {
      
      const dialogError = this.dialog.open(DialogErrorComponent,{
        data:{name:error}
      });
      dialogError.afterClosed().subscribe();
      return;      
    }

    this.serviceCliente.postCliente(nuevoClienteDto!)
      .subscribe(res=>{        
        const dialogSuccess = this.dialog.open(DialogSuccessComponent,{
          data:{name:res.nombre}
        });
        dialogSuccess.afterClosed().subscribe(res=>console.log(res));
        this.reset()
      },
        err=>{
          const dialogError = this.dialog.open(DialogErrorComponent,{
            data:{name:err}
          });
          dialogError.afterClosed().subscribe();
        }
    )

  }

  reset(){
    this.nuevoClienteForm.reset();
  }

  isValid(){
    return this.nuevoClienteForm.valid
  }
 }
