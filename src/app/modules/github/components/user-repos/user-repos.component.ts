import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router';
import { UserGitHubState } from '../../store/user-git-hub.reducer';
import { getUserGitHubError, getUserGitHubRepos } from '../../store/user-git-hub.selector';
import { loadUserRepos } from '../../store/user-git-hub.actions';

@Component({
  selector: 'app-user-repos',
  standalone: true,
  templateUrl: './user-repos.component.html',
  styleUrl: './user-repos.component.scss'
})

export class UserReposComponent implements OnInit {
  repos$: Observable<any[]>;
  error$: Observable<string | null>;

  constructor(private route: ActivatedRoute, private store: Store<UserGitHubState>) {
    this.repos$ = this.store.select(getUserGitHubRepos);
    this.error$ = this.store.select(getUserGitHubError);

  }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.store.dispatch(loadUserRepos({ payload: username }));
    }

}
