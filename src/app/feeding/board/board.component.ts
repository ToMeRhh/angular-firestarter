import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventDialogComponent } from '../dialogs/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedingBoardService } from '../board.service';
import { FeedingEvent } from '../board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class FeedingBoardComponent {
  @Input() board;

  // taskDrop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
  //   this.boardService.updateTasks(this.board.id, this.board.tasks);
  // }

  openDialog(feedingEvent?: FeedingEvent, idx?: number): void {
    const dialogRef = this.dialog.open(EventDialogComponent , {
      width: '500px',
      data: feedingEvent
        ? { feedingEvent: { ...feedingEvent }, isNew: false, boardId: this.board.id, idx }
        : { feedingEvent: { time_sec: new Date().getTime() / 1000, editor: "Tomer" }, isNew: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateFeedingEvents(this.board.id, [
            ...this.board.tasks,
            result.task
          ]);
        } else {
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardService.updateFeedingEvents(this.board.id, this.board.events);
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteFeedingBoards(this.board.id);
  }

  constructor(private boardService: FeedingBoardService, private dialog: MatDialog) {}
}
