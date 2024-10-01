import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import RegistroUserComponent from './auth/registro/registro-user/registro-user.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegistroUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appAgenda';
}
