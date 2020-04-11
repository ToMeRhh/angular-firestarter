import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedingBoardService } from '../board.service';

@Component({
  selector: 'app-task-dialog',
  styleUrls: ['./dialog.scss'],
  template: `
    <h1 mat-dialog-title>Event</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          placeholder="Task Time"
          matInput
          [(ngModel)]="data.feedingEvent.time_sec"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.feedingEvent.editor"
      >
        <mat-button-toggle *ngFor="let opt of editorOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === 'Meital' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>

      <app-delete-button
        (delete)="handleTaskDelete()"
        *ngIf="!data.isNew"
      ></app-delete-button>
    </div>
  `
})

export class EventDialogComponent {
  editorOptions = ['Tomer', 'Meital'];

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    private feedingBoardService: FeedingBoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.feedingBoardService.removeFeedingEvent(this.data.boardId, this.data.event);
    this.dialogRef.close();
  }
}
