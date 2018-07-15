import {Routes, RouterModule} from '@angular/router';
import {ProjListComponent} from './proj-list/proj-list.component';
import {ImageListComponent} from './image-list/image-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ProjListComponent},
  {path: 'project/:id/image', component: ImageListComponent}
  // {path: '**', component: ProjListComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
