import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { RegisterUserDto } from '../../../../domain/dtos/registro-user.dto';
import { RegistroUser } from '../../../../domain/entities/registroUser.';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro-user',
  standalone: true,
  imports: [
    CommonModule,MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,RouterLink
  ],
  templateUrl: './registro-user.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistroUserComponent {

  private router = inject(Router)
  private serviceAuth = inject(AuthServiceService);
  
  public dataRes: RegistroUser;
  public error: string = '';

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    emailValidated:new FormControl(false),
    avatar:new FormControl('')
  })


  matcher = new MyErrorStateMatcher();
  constructor() {
    this.dataRes = {
      id: 0,
      nombre: '',
      telefono: '',
      email: '',
      emailValidated: false,
      avatar: '',
      token: ''

    }

  }

  onSubmit(){
    
    if (this.registroForm.valid===false){
      console.log(this.registroForm.valid)
      return;
    }
    
    const [error1, userRegistroDto] = RegisterUserDto.create(this.registroForm.value);

    if (error1) {
      console.log(error1);
      return;
    } 

    this.serviceAuth.registroUser(userRegistroDto!).subscribe(res => {
      this.router.navigate(['/dashboard'])
    },
      err => {
        this.error = err.error.error;
        console.log(this.error);
      })
    
  }

  reset(){
    
    this.registroForm.reset()
  }

  isValid(){
    return this.registroForm.valid
  }
}
