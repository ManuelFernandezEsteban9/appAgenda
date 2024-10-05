import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

const base_url = environment.base_url

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthServiceService);
  console.log(route,state)

  return authService.validarToken();
  
  
};
