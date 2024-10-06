import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {

  authService = inject(AuthServiceService);
  router = inject(Router);

  ngOnInit(): void { 
    //console.log(this.authService.user)
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
