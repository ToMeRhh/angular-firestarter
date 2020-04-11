import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedingRoutingModule } from './feeding-routing.module';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FeedingBoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EventDialogComponent } from './dialogs/event-dialog.component';

@NgModule({
  declarations: [
    BoardsListComponent,
    FeedingBoardComponent,
    BoardDialogComponent,
    EventDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FeedingRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [BoardDialogComponent, EventDialogComponent]
})
export class FeedingBoardModule {}
