import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, addDoc, collection, collectionData, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, OnDestroy {
  
  game!: Game;
  private firestore: Firestore = inject(Firestore);
  items$:any;
  currentDoc$:any;
  gameId = '';

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    // const aCollection = collection(this.firestore, 'games')
    // this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.currentDoc$ = onSnapshot(doc(this.firestore, "games", params['id']), (doc) => {
        const docData = doc.data();
        this.game.currentPlayer = docData ? docData['currentPlayer'] : 0;
        this.game.playedCards = docData ? docData['playedCards'] : [];
        this.game.players = docData ? docData['players'] : [];
        this.game.stack = docData ? docData['stack'] : [];
        this.game.currentCard = docData ? docData['currentCard'] : '';
        this.game.pickCardAnimation = docData ? docData['pickCardAnimation'] : false;
    });
    });
  }

  ngOnDestroy(): void {
    // this.items$.unsubscribe();
    this.currentDoc$.unsubscribe();
    console.log('Items destoyed');
  }

  async newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game?.stack.pop();
      this.game.pickCardAnimation = true;
      this.game!.currentPlayer = this.game!.currentPlayer + 1; 
      this.game!.currentPlayer = this.game!.currentPlayer % this.game!.players.length;
      this.saveGame();
      setTimeout(() => {
        if (this.game.currentCard) {
          this.game?.playedCards.push(this.game.currentCard);
        }
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game?.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    const gameRef = doc(this.firestore, "games", this.gameId);
    await updateDoc(gameRef, this.game.toJson());
  }
}
