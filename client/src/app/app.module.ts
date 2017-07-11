import { BrowserModule }                        from '@angular/platform-browser';
import { NgModule }                             from '@angular/core';
import { ReactiveFormsModule }                  from '@angular/forms'
import { HttpModule }                           from '@angular/http';
import { FlashMessagesModule }                  from 'angular2-flash-messages';


import { AppComponent }                         from './app.component';
import { AppRoutingModule }                     from './app-routing.component';
import { HomeComponent }                        from './components/home/home.component';
import { PageNotFoundComponent }                from './components/page-not-found/page-not-found.component';
import { DashboardComponent }                   from './components/dashboard/dashboard.component';
import { NavbarComponent }                      from './navbar/navbar.component';
import { RegisterComponent }                    from './components/register/register.component'
import { AuthService }                          from './services/auth.service';
import { LoginComponent }                       from './components/login/login.component';
import { ProfileComponent }                     from './components/profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FlashMessagesModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
