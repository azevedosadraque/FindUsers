import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserReposComponent } from './user-repos/user-repos.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'user/:username', component: UserReposComponent },
];