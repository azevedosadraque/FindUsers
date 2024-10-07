import { Routes } from '@angular/router';
import { SearchComponent } from './modules/github/components/search/search.component';
import { UserListComponent } from './modules/github/components/user-list/user-list.component';
import { UserProfileComponent } from './modules/github/components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'users', component: UserListComponent},
  { path: 'profile/:username', component: UserProfileComponent}
];
