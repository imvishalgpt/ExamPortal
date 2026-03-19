import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';




@NgModule({
  declarations: [
    AppComponent, NavbarComponent,FooterComponent,SignupComponent,LoginComponent, 
    // Add other components here
  ]
  ,
  imports: [
    BrowserModule, HttpClientModule, CKEditorModule, NgxUiLoaderModule, NgxUiLoaderHttpModule.forRoot({showForeground: true,}),RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
    // Add other modules here
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
