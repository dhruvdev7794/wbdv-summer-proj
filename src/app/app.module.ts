import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {routing} from './app.routing';
import { ProjListComponent } from './proj-list/proj-list.component';
import {ProjectServiceClient} from './services/project.service.client';
import { ImageListComponent } from './image-list/image-list.component';
import {ImageServiceClient} from './services/image.service.client';
import {CommentServiceClient} from './services/comment.service.client';
import { ImageDispComponent } from './image-disp/image-disp.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageModificationsComponent } from './image-modifications/image-modifications.component';
import { RegisterComponent } from './register/register.component';
import {UserServiceClient} from './services/user.service.client';
import { ProfileComponent } from './profile/profile.component';
import {ProjectFilterPipe} from './proj-list/project-filter.pipe';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjListComponent,
    ImageListComponent,
    ImageDispComponent,
    ImageEditComponent,
    ImageModificationsComponent,
    RegisterComponent,
    ProfileComponent,
    ProjectFilterPipe,
    UsersComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    ProjectServiceClient,
    ImageServiceClient,
    CommentServiceClient,
    UserServiceClient
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
