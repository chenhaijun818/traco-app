import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserModule} from './user/user.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CoreModule} from './core/core.module';
import {RouterModule} from "@angular/router";
import {ProjectModule} from './project/project.module';
import {ApiInterceptor} from "./core/interceptors/api.interceptor";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {ResponseInterceptor} from "./core/interceptors/response.interceptor";
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzBackTopModule} from "ng-zorro-antd/back-top";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        UserModule,
        CoreModule,
        ProjectModule,
        BrowserAnimationsModule,
        NzMessageModule,
        NzBackTopModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
    {provide: NZ_I18N, useValue: zh_CN},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
