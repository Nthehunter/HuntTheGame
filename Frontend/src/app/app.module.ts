import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { HomePage } from './views/home/home.page';
import { LoginPage } from './views/login/login.page';
import { ComponentsModule } from './components/components.module';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';






@NgModule({
  declarations: [AppComponent, ],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, 
  
    FileTransferObject,
],
  bootstrap: [AppComponent],
})
export class AppModule {

}
