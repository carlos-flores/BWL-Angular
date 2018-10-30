import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// RUTAS
import { APP_ROUTES } from './app.routes';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MapaComponent } from "./components/mapa/mapa.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";

import { UserService } from './services/user.services';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";


import localeEs from "@angular/common/locales/es-MX";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs,'es-MX');

//import * as $ from "jquery";
import { Select2Module } from "ng2-select2";
import { WeatherComponent } from './components/dashboard/weather/weather.component';
import { GeneralService } from './services/general.service.';
import { TareasComponent } from './components/dashboard/tareas/tareas.component';
import { CrearTareaComponent } from './components/dashboard/crear-tarea/crear-tarea.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    MapaComponent,
    UsuariosComponent,
    DashboardComponent,
    WeatherComponent,
    TareasComponent,
    CrearTareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES,
    HttpClientModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyATHtRBXHCIjuNoC-lYbwAULl7XB7225d8'
      apiKey: "AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14"
    }),
    AgmSnazzyInfoWindowModule,
    Select2Module
  ],
  providers: [UserService,GeneralService, { provide: LOCALE_ID, useValue: "es-MX" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
