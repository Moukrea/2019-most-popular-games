import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game';
import { map } from 'rxjs/operators';
import { PaginatedGames } from './paginated-games';
import { GameDetails } from './game-details';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  findAll(page: number = 1) {
    return this.http
      .get<PaginatedGames>(
        `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added&page_size=24&page=${page}`
      )
      .pipe(
        map((data) => {
          let results = [];

          for (let i = 0; i < data.results.length; i++) {
            let game = {
              id: data.results[i].id,
              name: data.results[i].name,
              released: data.results[i].released,
              background_image: data.results[i].background_image,
              genres: [],
              chart: i + 1 * (24 * page) - 23,
            };

            for (let j = 0; j < data.results[i].genres.length; j++) {
              game.genres.push(data.results[i].genres[j].name);
            }

            results.push(game);
          }

          let paginatedGames = {
            next:
              data.next !== null && data.next.includes('&page=')
                ? +/page=([0-9]+)/g.exec(data.next)[1]
                : null,
            previous:
              data.previous !== null && data.previous.includes('&page=')
                ? +/page=([0-9]+)/g.exec(data.previous)[1]
                : null,
            results: results,
          };
          return paginatedGames;
        })
      );
  }

  find(id: number) {
    return this.http
      .get<GameDetails>(`https://api.rawg.io/api/games/${id}`)
      .pipe(
        map((data) => {
          let game = {
            genres: [],
            metacritic_platforms: [],
            developers: [],
            description: data.description.replace(/(<([^>]+)>)/gi, ''),
          };

          for (let i = 0; i < data.genres.length; i++) {
            game.genres.push(data.genres[i].name);
          }

          for (let i = 0; i < data.metacritic_platforms.length; i++) {
            game.metacritic_platforms.push(
              data.metacritic_platforms[i].platform.name
            );
          }

          for (let i = 0; i < data.developers.length; i++) {
            game.developers.push(data.developers[i].name);
          }
          return { ...data, ...game };
        })
      );
  }
}
