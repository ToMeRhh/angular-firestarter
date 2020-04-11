import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { FeedingEvent, FeedingEventBoard } from './board.model';

const boardsCollectionName = 'feeding_boards';

@Injectable({
  providedIn: 'root'
})
export class FeedingBoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates a new board for the current user
   */
  async createFeedingBoard(data: FeedingEventBoard) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection(boardsCollectionName).add({
      ...data,
      uid: user.uid,
      debug: "123",
      events: []
    });
  }

  /**
   * Get all boards owned by current user
   */
  getFeedingBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<FeedingEventBoard>(boardsCollectionName, ref =>
              ref.where('uid', '==', user.uid).orderBy('board_creation_time')
            )
            .valueChanges({ idField: 'uid' });
        } else {
          return [];
        }
      }),
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }

  // /**
  //  * Run a batch write to change the priority of each board for sorting
  //  */
  // sortFeedingBoards(boards: Board[]) {
  //   const db = firebase.firestore();
  //   const batch = db.batch();
  //   const refs = boards.map(b => db.collection(boardsCollectionName).doc(b.time_sec));
  //   refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
  //   batch.commit();
  // }

  /**
   * Delete board
   */
  deleteFeedingBoards(boardId: string) {
    console.log("boardid is: " + boardId);
    return this.db
      .collection(boardsCollectionName)
      .doc(boardId)
      .delete();
  }

  /**
   * Updates the tasks on board
   */
  updateFeedingEvents(boardId: string, event: FeedingEvent[]) {
    return this.db
      .collection(boardsCollectionName)
      .doc(boardId)
      .update({ event });
  }

  /**
   * Remove a specifc task from the board
   */
  removeFeedingEvent(boardId: string, event: FeedingEvent) {
    return this.db
      .collection(boardsCollectionName)
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(event)
      });
  }
}
