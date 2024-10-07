import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { getUser, getUsers, getUserSuccess, loadUserRepos, loadUserReposSuccess } from '../../store/user-git-hub.actions';
import { NetworkService } from '../../../../services/network.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ]
})
export class SearchComponent {
  username: string = '';
  errorMessage: string | null = null;
  lastUserId: number = 0;
  isOffline: boolean = false;


  constructor(
    private router: Router,
    private store: Store,
    private networkService: NetworkService,
  ) {
    this.networkService.onlineStatus$.subscribe(isOnline => {
      this.isOffline = !isOnline;
    });}

    searchUser() {
      if (this.username.trim() === '') {
        this.fetchUsers();
        this.router.navigate(['/users']);
      } else {
        if (this.isOffline) {
          this.loadUserFromCache(this.username);
        } else {
          this.store.dispatch(getUser({ payload: this.username }));
          this.store.dispatch(loadUserRepos({ payload: this.username }));

          this.router.navigate(['/profile', this.username]);
        }
      }
    }
  
    private loadUserFromCache(username: string) {
      const cachedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '{}');
  
      if (cachedUsers[username]) {
        console.log('Usuário encontrado no cache:', cachedUsers[username]);
        
        this.store.dispatch(getUserSuccess({ payload: cachedUsers[username].userData }));
        this.store.dispatch(loadUserReposSuccess({ payload: cachedUsers[username].repos }));
  
        this.router.navigate(['/profile', username]);
      } else {
        console.log('Usuário não encontrado no cache.');
      }
    }
    
  fetchUsers() {
    this.store.dispatch(getUsers());
  }
}
