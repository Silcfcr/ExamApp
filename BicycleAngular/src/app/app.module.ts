import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AddBicyclesComponent } from './add-bicycles/add-bicycles.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddBicyclesComponent,
    UserRegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
