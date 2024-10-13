import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteEntity } from '../domain/entities/cliente.entity';
import { ClienteNuevoDto } from '../domain/dtos/nuevo_cliente.dto';

const base_url = environment.base_url;
const bearerToken = 'Bearer '+localStorage.getItem('token');
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);
  
  constructor() { }

  getAllClientes():Observable<ClienteEntity[]>{

    return this.http.get<ClienteEntity[]>(`${base_url}/clientes`,
        {
          headers:{"Authorization":bearerToken}
        }
    );

  }

  postCliente(clienteDto:ClienteNuevoDto):Observable<ClienteEntity>{    

    return this.http.post<ClienteEntity>(`${base_url}/clientes`,clienteDto,
      {
        headers:{"Authorization":bearerToken}
      }
    )

  }

}
