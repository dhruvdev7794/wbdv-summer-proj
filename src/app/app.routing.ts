import {Routes, RouterModule} from '@angular/router';
import {ProjListComponent} from './proj-list/proj-list.component';
import {ImageListComponent} from './image-list/image-list.component';
import {ImageDispComponent} from './image-disp/image-disp.component';
import {LoginComponent} from './login/login.component';
import {ImageModificationsComponent} from './image-modifications/image-modifications.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {HomePageComponent} from './home-page/home-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'users', component: UsersComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'user', component: UserInfoComponent},
  {path: 'user/:userId', component: UserInfoComponent},
  {path: 'projects', component: ProjListComponent},
  {path: 'project/:id/image', component: ImageListComponent},
  {path: 'image/:imageId/edit', component: ImageModificationsComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
