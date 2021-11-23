import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectModifyPageRoutingModule } from './collect-modify-routing.module';

import { CollectModifyPage } from './collect-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectModifyPageRoutingModule
  ],
  declarations: [CollectModifyPage]
})
export class CollectModifyPageModule {}
