import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SymbolsListComponent } from './components/symbols-list/symbols-list.component';
import { SymbolEntryComponent } from './components/symbol-entry/symbol-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { SymbolAddComponent } from './components/symbol-add/symbol-add.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SymbolsListComponent, SymbolEntryComponent, SymbolAddComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
