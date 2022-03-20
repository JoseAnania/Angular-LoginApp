import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// importamos el FromsModule
import { FormsModule } from '@angular/forms';
// importamos el HttpClientModule (nos permitirá manejar una BD desde "firebase.com")
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // agregamos la importación
    FormsModule,
    // agregamos la importación
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
