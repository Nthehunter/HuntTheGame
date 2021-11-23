import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectAddPageRoutingModule } from './collect-add-routing.module';

import { CollectAddPage } from './collect-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectAddPageRoutingModule
  ],
  declarations: [CollectAddPage]
})
export class CollectAddPageModule {}
