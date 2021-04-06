import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockEntryComponent } from './components/stock-entry/stock-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { StockAddComponent } from './components/stock-add/stock-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockDeleteComponent } from './components/stock-delete/stock-delete.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksListComponent,
    StockEntryComponent,
    StockAddComponent,
    StockDeleteComponent,
    SettingsComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
