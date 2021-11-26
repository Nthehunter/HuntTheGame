import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameAddModalPageRoutingModule } from './game-add-modal-routing.module';

import { GameAddModalPage } from './game-add-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameAddModalPageRoutingModule
  ],
  declarations: [GameAddModalPage]
})
export class GameAddModalPageModule {}
