import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterUserDto } from '../domain/dtos/registro-user.dto';
import { UserResponse } from '../domain/entities/userResponse.';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginUserDto } from '../domain/dtos/login_user.dto';
import { environment } from '../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user: UserResponse | undefined;

  private http = inject(HttpClient);

  constructor() { }

  logOut(){
    localStorage.removeItem('token');
  }

  registroUser(registroDto: RegisterUserDto): Observable<UserResponse> {

    return this.http.post<UserResponse>(`${base_url}/auth/register`, registroDto).pipe(
      tap(resp => { 
        localStorage.setItem('token', resp.token) ;
        this.user = resp;
      })
    );

  }

  loginUser(loginUserDto: LoginUserDto): Observable<UserResponse> {

    return this.http.post<UserResponse>(`${base_url}/auth/login`, loginUserDto).pipe(
      tap(resp => { 
        localStorage.setItem('token', resp.token) ;
        this.user = resp;

      })
    );

  }

  validarToken():Observable<boolean>{

    if (!localStorage.getItem('token')) return of(false)

    const token = localStorage.getItem('token') || '';    
    return this.http.get<UserResponse>(`${base_url}/auth/user/`,
      {
        headers:{'x-token':token}
      }
    )
      .pipe(
        tap(resp => { 
          localStorage.setItem('token', resp.token) ;
          this.user = resp;
        }),
        map(user=>!!user)
      )
    
  }

}
