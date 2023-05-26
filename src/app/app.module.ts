import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SettingRatingComponent } from './components/setting-rating/setting-rating.component';
import { ShowingRatingComponent } from './components/showing-rating/showing-rating.component';
import { ExchangeDataService } from './services/exchange-data.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingRatingComponent,
    ShowingRatingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ExchangeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
