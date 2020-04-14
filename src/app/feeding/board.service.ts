import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { FeedingEvent, FeedingEventBoard } from './board.model';


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
    return this.db.collection('feeding_boards').add({
      ...data,
      uid: user.uid,
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
            .collection<FeedingEventBoard>('feeding_boards', ref =>
              ref.where('uid', '==', user.uid).orderBy('board_creation_time')
            ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FeedingEventBoard;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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
  //   const refs = boards.map(b => db.collection('feeding_boards').doc(b.time_sec));
  //   refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
  //   batch.commit();
  // }

  /**
   * Delete board
   */
  deleteFeedingBoards(boardId: string) {
    return this.db
      .collection('feeding_boards')
      .doc(boardId)
      .delete();
  }

  /**
   * Updates the tasks on board
   */
  updateFeedingEvents(boardId: string, events: FeedingEvent[]) {
    return this.db
      .collection('feeding_boards')
      .doc(boardId)
      .update({ events });
  }

  /**
   * Adds an event to the board
   */
  addFeedingEvents(boardId: string, event: FeedingEvent) {
    return this.db
      .collection('feeding_boards')
      .doc(boardId)
      .update({ events: firebase.firestore.FieldValue.arrayUnion(event) });
  }

  /**
   * Remove a specifc task from the board
   */
  removeFeedingEvent(boardId: string, event: FeedingEvent) {
    return this.db
      .collection('feeding_boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(event)
      });
  }
}
