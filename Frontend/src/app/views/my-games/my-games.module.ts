import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyGamesPageRoutingModule } from './my-games-routing.module';

import { MyGamesPage } from './my-games.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyGamesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MyGamesPage]
})
export class MyGamesPageModule {}
