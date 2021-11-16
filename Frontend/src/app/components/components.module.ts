import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [MenuComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MenuComponent, HeaderComponent, FooterComponent]
 })
export class ComponentsModule { }