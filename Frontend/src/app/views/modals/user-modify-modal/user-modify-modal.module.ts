import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserModifyModalPageRoutingModule } from './user-modify-modal-routing.module';

import { UserModifyModalPage } from './user-modify-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserModifyModalPageRoutingModule
  ],
  declarations: [UserModifyModalPage]
})
export class UserModifyModalPageModule {}
