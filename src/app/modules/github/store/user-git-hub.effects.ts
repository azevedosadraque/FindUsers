import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { GitUserService } from '../services/git-user.service';
import { userGitHubTypeAction } from './user-git-hub.type-action.enum';
import { loadUserReposNotFound, loadUserReposSuccess } from './user-git-hub.actions';


export const getUsers$ = createEffect(
  (actions$: Actions = inject(Actions), gitUserService: GitUserService = inject(GitUserService)) => {
    return actions$.pipe(
      ofType(userGitHubTypeAction.LOAD_USER_REPOS),
      exhaustMap((data: any) =>
        gitUserService.getUserRepos(data.payload).pipe(
          map(data => loadUserReposSuccess({ payload: data })),
          catchError(error => [loadUserReposNotFound(error)])
        )
      )
    );
  },
  { functional: true }
);

export const storeUserRepos$ = createEffect(
  (
    actions$: Actions = inject(Actions)
  ) => {
    return actions$.pipe(
      ofType(userGitHubTypeAction.LOAD_USER_REPOS_RESPONSE_SUCCESS),
      tap(({ username, repos }) => {
        const cachedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '{}');
        cachedUsers[username] = repos;
        localStorage.setItem('cachedUsers', JSON.stringify(cachedUsers));
      })
    );
  },
  { dispatch: false, functional: true }
);

