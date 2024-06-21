import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  firestore:Firestore = inject(Firestore);

  constructor(private router: Router) {}

  async newGame() {
    // Start Game
    const game = new Game();
    const gameId = await addDoc(collection(this.firestore, "games"), game.toJson()).then((gameinfo) => {
      this.router.navigateByUrl('/game/' + gameinfo.id);
    });
  }

}
