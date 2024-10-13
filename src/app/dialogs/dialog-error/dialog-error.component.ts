import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  selector: 'app-dialog-error',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-error.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogErrorComponent { 
  readonly dialogRef = inject(MatDialogRef<DialogErrorComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  //readonly animal = model(this.data.animal);

  okClick(): void {
    this.dialogRef.close();
  }
}
