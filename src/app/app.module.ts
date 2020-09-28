import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DailySelectionModule } from './components/calendar/daily-section/daily-selection.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HeaderComponent } from './components/header/header.component';
import { DailySectionComponent } from './components/calendar/daily-section/daily-section.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { FormModalModule } from './components/form-modal/form-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DailySelectionModule,
    FormModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [ DailySectionComponent, FormModalComponent ]

})
export class AppModule { }
