import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'registro', 
        loadComponent: ()=> import('./auth/registro/registro-user/registro-user.component')
    },
    {
        path:'login', 
        loadComponent: ()=> import('./auth/login/login-user/login-user.component')
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    
    {
        path:'dashboard',
        canActivate:[authGuard],
        loadComponent:()=>import('./dashboard/dashboard/dashboard.component'),
        
        children:[
            {path:'clientes',loadComponent:()=>import('./clientes/clientes.component')},
            {path:'visitas',loadComponent:()=>import('./visitas/visitas.component')}
        ]
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch:'full'
    },
];
