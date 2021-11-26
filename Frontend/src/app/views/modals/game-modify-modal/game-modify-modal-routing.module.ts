import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameModifyModalPage } from './game-modify-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GameModifyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameModifyModalPageRoutingModule {}
