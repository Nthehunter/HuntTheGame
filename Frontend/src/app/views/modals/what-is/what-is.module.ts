import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatIsPageRoutingModule } from './what-is-routing.module';

import { WhatIsPage } from './what-is.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatIsPageRoutingModule
  ],
  declarations: [WhatIsPage]
})
export class WhatIsPageModule {}
