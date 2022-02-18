import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import { Platform } from '@ionic/angular';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [MenuComponent, HeaderComponent, FooterComponent, ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MenuComponent, HeaderComponent, FooterComponent, ]
 })
export class ComponentsModule { }