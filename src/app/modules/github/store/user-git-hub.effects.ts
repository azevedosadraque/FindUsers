import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GitUserService } from '../services/git-user.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { userGitHubTypeAction } from './user-git-hub.type-action.enum';
import * as fromGitHubActions from './user-git-hub.actions'

@Injectable()
export class UserGitHubEffects {

  constructor(private actions$: Actions, private githubService: GitUserService) {}

  loadUserRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userGitHubTypeAction.LOAD_USER_REPOS),
      exhaustMap((data: any) => {
        return this.githubService.getUserRepos(data.payload)
        .pipe(
          map(payload => (
            fromGitHubActions.loadUserReposSuccess({payload: payload.data})
          )),
          catchError(error =>{
            return of(fromGitHubActions.loadUserReposNotFound({ payload: error}))
          })
        )
      })
    )
  );
}
