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

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.events, event.previousIndex, event.currentIndex);
    this.boardService.updateFeedingEvents(this.board.uid, this.board.events);
  }

  getCurrentTime(): string {
    const x = new Date();
    return x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds();
  }

  openDialog(feedingEvent?: FeedingEvent, idx?: number): void {
    const newEvent = { time_sec: this.getCurrentTime(), editor: "Tomer" };
    const dialogRef = this.dialog.open(EventDialogComponent , {
      width: '500px',
      data: feedingEvent
        ? { event: { ...feedingEvent }, isNew: false, boardId: this.board.id, idx }
        : { event: newEvent, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.boardService.addFeedingEvents(this.board.id, result.event);
          // this.boardService.updateFeedingEvents(this.board.id, [
          //   ...this.board.events,
          //   result.event
          // ]);
        } else {
          const update = this.board.events;
          update.splice(result.idx, 1, result.event);
          this.boardService.updateFeedingEvents(this.board.id, update);
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteFeedingBoards(this.board.id);
  }

  constructor(private boardService: FeedingBoardService, private dialog: MatDialog) {}
}
