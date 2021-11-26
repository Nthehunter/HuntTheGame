import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminGamesPageRoutingModule } from './admin-games-routing.module';

import { AdminGamesPage } from './admin-games.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminGamesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminGamesPage]
})
export class AdminGamesPageModule {}
