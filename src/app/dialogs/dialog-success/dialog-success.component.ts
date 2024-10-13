import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { 
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,  
  MatDialogRef,  
  MatDialogTitle,
} from '@angular/material/dialog';
interface DialogData{
  name:string;
}
@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-success.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSuccessComponent { 
  readonly dialogRef = inject(MatDialogRef<DialogSuccessComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  //readonly animal = model(this.data.animal);

  okClick(): void {
    this.dialogRef.close();
  }
}
