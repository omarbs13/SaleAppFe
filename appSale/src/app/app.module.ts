import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NopageFoundComponent } from './pages/nopage-found/nopage-found.component';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MethodsHttpProvider } from './providers/methodsHttpProviders';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent,

   
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,SharedModule, BrowserAnimationsModule,HttpClientModule
  ],
  providers: [MethodsHttpProvider],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
