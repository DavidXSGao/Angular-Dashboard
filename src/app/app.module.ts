import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { TransitComponent } from './components/transit/transit.component';
import { HomeComponent } from './home/home.component';
import { ComicsComponent } from './components/comics/comics.component';
import { HoneyComponent } from './components/honey/honey.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FinanceComponent } from './components/finance/finance.component';
import { RssComponent } from './components/rss/rss.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { JiraComponent } from './components/jira/jira.component';
import { ReleaseComponent } from './components/release/release.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    TransitComponent,
    HomeComponent,
    ComicsComponent,
    RssComponent,
    HoneyComponent,
    WeatherComponent,
    FinanceComponent,
    PicturesComponent,
    JiraComponent,
    ReleaseComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
