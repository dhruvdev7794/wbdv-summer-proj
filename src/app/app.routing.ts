import {Routes, RouterModule} from '@angular/router';
import {ProjListComponent} from './proj-list/proj-list.component';
import {ImageListComponent} from './image-list/image-list.component';
import {ImageDispComponent} from './image-disp/image-disp.component';
import {LoginComponent} from './login/login.component';
import {ImageModificationsComponent} from './image-modifications/image-modifications.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LoginComponent},
  {path: 'project/:id/image', component: ImageListComponent},
  {path: 'image/:imageId/edit', component: ImageModificationsComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
