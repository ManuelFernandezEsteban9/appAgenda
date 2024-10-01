import { Routes } from '@angular/router';

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
        path:'**',
        redirectTo:'login',
        pathMatch:'full'
    }
];
