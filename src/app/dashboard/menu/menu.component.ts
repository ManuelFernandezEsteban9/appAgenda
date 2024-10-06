import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,UserMenuComponent,
    CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatMenuModule
  ],
  templateUrl: './menu.component.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent { }
