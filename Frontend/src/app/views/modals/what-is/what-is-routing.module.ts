import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatIsPage } from './what-is.page';

const routes: Routes = [
  {
    path: '',
    component: WhatIsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatIsPageRoutingModule {}
