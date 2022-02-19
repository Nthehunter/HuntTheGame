import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { FileTransferObject } from '@ionic-native/file-transfer';





@NgModule({
  declarations: [AppComponent, ],
  entryComponents: [],
  imports: [HttpClientModule , BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule],
  providers:  [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, 
  
    FileTransferObject,
],
  bootstrap: [AppComponent],
})
export class AppModule {

}
