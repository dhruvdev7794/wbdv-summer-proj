import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {routing} from './app.routing';
import { ProjListComponent } from './proj-list/proj-list.component';
import {ProjectServiceClient} from './services/project.service.client';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjListComponent,
    ImageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    ProjectServiceClient,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
