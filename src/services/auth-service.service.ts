import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterUserDto } from '../domain/dtos/registro-user.dto';
import { UserResponse } from '../domain/entities/userResponse.';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../domain/dtos/login_user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient);

  constructor() { }

  registroUser(registroDto:RegisterUserDto):Observable<UserResponse>{

    return this.http.post<UserResponse>('http://localhost:3000/api/auth/register',registroDto);
          
  }

  loginUser(loginUserDto:LoginUserDto):Observable<UserResponse>{

    return this.http.post<UserResponse>('http://localhost:3000/api/auth/login',loginUserDto);
          
  }

}
