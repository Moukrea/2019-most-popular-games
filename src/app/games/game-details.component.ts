import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from './game-details';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styles: [],
})
export class GameDetailsComponent implements OnInit {
  game: GameDetails;
  gameLoading = true;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('gameid')),
        switchMap((id) => this.gameService.find(+id))
      )
      .subscribe((game) => {
        this.game = game;
        this.gameLoading = false;
      });
  }
}
