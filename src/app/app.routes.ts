import { Routes } from '@angular/router';
import { SearchComponent } from './modules/github/components/search/search.component';
import { UserReposComponent } from './modules/github/components/user-repos/user-repos.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'user/:username', component: UserReposComponent },
];