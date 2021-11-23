import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectAddPage } from './collect-add.page';

const routes: Routes = [
  {
    path: '',
    component: CollectAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectAddPageRoutingModule {}
