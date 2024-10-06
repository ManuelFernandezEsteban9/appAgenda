import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteEntity } from '../domain/entities/clientesResponse';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);
  
  constructor() { }

  getAllClientes():Observable<ClienteEntity[]>{
  
    const bearerToken = 'Bearer '+localStorage.getItem('token');

    return this.http.get<ClienteEntity[]>(`${base_url}/clientes`,
        {
          headers:{"Authorization":bearerToken}
        }
    );

  }

}
