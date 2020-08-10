import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { Game } from './game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styles: [],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  loading = true;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  gameId: number;
  showDetailsComponent = false;

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    this.getGamePage();
  }

  getGamePage(page: number = 1) {
    this.loading = true;
    this.gameService.findAll(page).subscribe((games) => {
      let previousPage;
      if (page === 1) {
        previousPage = null;
      } else if (page === 2) {
        previousPage = 1;
      } else {
        previousPage = games.previous;
      }
      this.loading = false;
      this.games = games.results;
      this.currentPage = page;
      this.previousPage = previousPage;
      this.nextPage = games.next;
    });
  }

  showGameDetails(gameId) {
    this.gameId = gameId;
    this.showDetailsComponent = true;
  }

  changeDisplayState() {
    this.showDetailsComponent = false;
  }
}
