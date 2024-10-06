import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-visitas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './visitas.component.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VisitasComponent { }
