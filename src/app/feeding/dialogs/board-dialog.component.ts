import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Feeding Board</h1>
    <div mat-dialog-content>
    <p>What date does that board referres to (DD/MM/YYYY)?</p>
      <mat-form-field>
        <input placeholder="title" matInput [(ngModel)]="data.custom_board_date" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.custom_board_date" cdkFocusInitial>
        Create
      </button>
    </div>
  `
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
