import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSuneditorModule } from 'ngx-suneditor';
import { NgxUploaderModule } from 'ngx-uploader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgxSuneditorModule } from 'ngx-suneditor/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSuneditorModule,
    NgxUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
