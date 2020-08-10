import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameDetailsComponent } from './games/game-details.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:gameid', component: GameDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
