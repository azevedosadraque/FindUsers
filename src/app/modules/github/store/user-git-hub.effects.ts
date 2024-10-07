import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { userGitHubTypeAction } from './user-git-hub.type-action.enum';
import { getUserFailure, getUsersFailure, getUsersSuccess, getUserSuccess, loadUserReposNotFound, loadUserReposSuccess } from './user-git-hub.actions';
import { GitHubApiService } from '../../../shared/services/github-api/github-api.service';


export const getUserRepo$ = createEffect(
  (actions$: Actions = inject(Actions), gitUserService: GitHubApiService = inject(GitHubApiService)) => {
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

export const getUsers$ = createEffect(
  (actions$: Actions = inject(Actions), gitUserService: GitHubApiService = inject(GitHubApiService)) => {
    return actions$.pipe(
      ofType(userGitHubTypeAction.GET_USERS),
      exhaustMap((data: any) =>
        gitUserService.getUsers(data.payload).pipe(
          map(data => getUsersSuccess({ payload: data })),
          catchError(error => [getUsersFailure(error)])
        )
      )
    );
  },
  { functional: true }
);

export const getUser$ = createEffect(
  (actions$: Actions = inject(Actions), gitUserService: GitHubApiService = inject(GitHubApiService)) => {
    return actions$.pipe(
      ofType(userGitHubTypeAction.GET_USER),
      exhaustMap((data: any) =>
        gitUserService.getUser(data.payload).pipe(
          map(data => getUserSuccess({ payload: data })),
          catchError(error => [getUserFailure(error)])
        )
      )
    );
  },
  { functional: true }
);

export const storeUserData$ = createEffect(
  (actions$: Actions = inject(Actions)) => {
    return actions$.pipe(
      ofType(userGitHubTypeAction.GET_USER_SUCCESS),
      tap(({ username, userModel }) => {
        const cachedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '{}');
        
        cachedUsers[username] = { 
          userData: userModel,
          repos: cachedUsers[username]?.repos || []
        };

        localStorage.setItem('cachedUsers', JSON.stringify(cachedUsers));
      })
    );
  },
  { dispatch: false, functional: true }
);

export const storeUserRepos$ = createEffect(
  (actions$: Actions = inject(Actions)) => {
    return actions$.pipe(
      ofType(userGitHubTypeAction.LOAD_USER_REPOS_RESPONSE_SUCCESS),
      tap(({ username, repos }) => {
        const cachedUsers = JSON.parse(localStorage.getItem('cachedUsers') || '{}');

        if (cachedUsers[username]) {
          cachedUsers[username].repos = repos;
        } else {
          cachedUsers[username] = { userData: null, repos };
        }

        localStorage.setItem('cachedUsers', JSON.stringify(cachedUsers));
      })
    );
  },
  { dispatch: false, functional: true }
);


