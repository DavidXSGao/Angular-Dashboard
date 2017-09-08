import { Routes } from '@angular/router';

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
import {AdminComponent} from "./components/admin/admin.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'transit', component: TransitComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'honey', redirectTo: 'honey/other', pathMatch: 'full' },
  { path: 'honey/:feedName', component: HoneyComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'rss', redirectTo: 'rss/cbs', pathMatch: 'full' },
  { path: 'rss/:feedName', component: RssComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'jira/:listName', component: JiraComponent },
  { path: 'release', component: ReleaseComponent },
  { path: 'admin', component: AdminComponent }
];

