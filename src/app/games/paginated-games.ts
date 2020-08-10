import { Game } from './game';

export interface PaginatedGames {
  next?: any;
  previous?: any;
  results: Game[];
}
