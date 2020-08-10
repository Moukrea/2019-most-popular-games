import { Component } from '@angular/core';
import { GamesService } from './games/games.service';
import { Game } from './games/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RAWG 2019 Most Popular Games';
}
