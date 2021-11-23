import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectModifyPage } from './collect-modify.page';

const routes: Routes = [
  {
    path: '',
    component: CollectModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectModifyPageRoutingModule {}
