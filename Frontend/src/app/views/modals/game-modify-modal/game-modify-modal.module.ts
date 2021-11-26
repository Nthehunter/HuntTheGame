import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameModifyModalPageRoutingModule } from './game-modify-modal-routing.module';

import { GameModifyModalPage } from './game-modify-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameModifyModalPageRoutingModule
  ],
  declarations: [GameModifyModalPage]
})
export class GameModifyModalPageModule {}
