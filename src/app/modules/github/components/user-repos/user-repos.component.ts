import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router';
import { UserGitHubState } from '../../store/user-git-hub.reducer';
import { getUserGitHubError, getUserGitHubLoading, getUserGitHubRepos } from '../../store/user-git-hub.selector';
import { loadUserRepos } from '../../store/user-git-hub.actions';
import { NetworkService } from '../../../../services/network.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-repos',
  standalone: true,
  templateUrl: './user-repos.component.html',
  styleUrl: './user-repos.component.scss',
  imports: [CommonModule]
})

export class UserReposComponent implements OnInit {
  repos$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isOnline$: Observable<boolean>;

  constructor(private route: ActivatedRoute, 
              private store: Store<UserGitHubState>,
              private networkService: NetworkService ) 
  {
    this.repos$ = this.store.select(getUserGitHubRepos);
    this.loading$ = this.store.select(getUserGitHubLoading);
    this.error$ = this.store.select(getUserGitHubError);
    this.isOnline$ = this.networkService.onlineStatus$;

  }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
  
    console.log(username)
    if (username) {
      console.log(username)
      if (navigator.onLine) {
        this.store.dispatch(loadUserRepos({ payload: username }));
      } else {
        const cachedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '{}');
        if (cachedUsers[username]) {
          this.repos$ = of(cachedUsers[username]);
        } else {
          this.error$ = of('No data available offline for this user.');
        }
      }
    }
  }
}
