import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from "angular2-datatable";
 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Menu } from './app/menu.component/menu.component.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    Menu.ComponentComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FusionChartsModule,
    ChartsModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
    
  ],
  providers: [
    AuthService,
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
