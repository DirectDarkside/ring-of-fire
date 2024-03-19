import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  newGame() {
    // Start Game
    
    window.location.href = './game';
  }

}
