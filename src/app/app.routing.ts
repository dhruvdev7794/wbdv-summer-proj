import {Routes, RouterModule} from '@angular/router';
import {ProjListComponent} from './proj-list/proj-list.component';
import {ImageListComponent} from './image-list/image-list.component';
import {ImageDispComponent} from './image-disp/image-disp.component';
import {LoginComponent} from './login/login.component';
import {ImageModificationsComponent} from './image-modifications/image-modifications.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: ProjListComponent},
  {path: 'project/:id/image', component: ImageListComponent},
  {path: 'image/:imageId/edit', component: ImageModificationsComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
