import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGamesPage } from './admin-games.page';

const routes: Routes = [
  {
    path: '',
    component: AdminGamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminGamesPageRoutingModule {}
