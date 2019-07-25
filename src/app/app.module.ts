import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundModule } from './modules/page-not-found/page-not-found.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { InterceptorService } from './interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

const COMPONENTS = [ AppComponent ];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  SharedModule,
  PageNotFoundModule
];

const PROVIDERS = [
  HttpClientModule,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES,
  ],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
