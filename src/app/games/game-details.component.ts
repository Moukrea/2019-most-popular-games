import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Input() gameId: number;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange) {
    if (changes.hasOwnProperty('gameId') && this.gameId !== undefined) {
      this.gameLoading = true;
      this.gameService.find(this.gameId).subscribe((game) => {
        this.game = game;
        this.gameLoading = false;
      });
    }
  }

  changeDisplayState() {
    this.displayChange.emit();
  }
}
