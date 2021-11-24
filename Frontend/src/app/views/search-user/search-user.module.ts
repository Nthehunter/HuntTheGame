import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchUserPageRoutingModule } from './search-user-routing.module';

import { SearchUserPage } from './search-user.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchUserPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchUserPage]
})
export class SearchUserPageModule {}
