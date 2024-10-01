import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginUserDto } from '../../../../domain/dtos/login_user.dto';
import { AuthServiceService } from '../../../../services/auth-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    CommonModule, CommonModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink
  ],
  templateUrl: './login-user.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginUserComponent {
  loginForm = new FormGroup({    
    email: new FormControl('', [Validators.required, Validators.email]),    
    password: new FormControl('', [Validators.required]),
    
  })
  matcher = new MyErrorStateMatcher();
  private serviceAuth = inject(AuthServiceService);
  error:string='';

  
  isValid():boolean{
    return this.loginForm.valid
  }

  onSubmit(){
    
    if (this.loginForm.valid===false) return;

    const [error1,userLoginDto] = LoginUserDto.create(this.loginForm.value);
    if (error1){
      console.log(error1);
      return;
    }

    this.serviceAuth.loginUser(userLoginDto!).subscribe(res=>{
      console.log(res);
    },
      err=>{
        this.error=err.error.error;
        console.log(this.error);
      })

  }

  reset(){}

 }
