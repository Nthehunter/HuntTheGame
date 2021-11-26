import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameAddModalPage } from './game-add-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GameAddModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameAddModalPageRoutingModule {}
