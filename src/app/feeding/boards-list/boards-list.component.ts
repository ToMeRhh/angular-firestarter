import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { FeedingEventBoard } from '../board.model';
import { FeedingBoardService } from '../board.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {

  boards: FeedingEventBoard[];
  sub: Subscription;

  constructor(public feedingBoardService: FeedingBoardService, public dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.feedingBoardService
      .getFeedingBoards()
      .subscribe(boards => (this.boards = boards));
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  //   this.feedingBoardService.sortBoards(this.boards);
  // }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.feedingBoardService.createFeedingBoard({
          board_creation_time: result ? result : new Date().toJSON().slice(0,10),
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
