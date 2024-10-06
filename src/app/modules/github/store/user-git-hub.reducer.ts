import { createReducer, on } from '@ngrx/store';
import { loadUserReposSuccess, loadUserReposNotFound } from './user-git-hub.actions';

export interface UserGitHubState {
  repos: any[];
  error: string | null;
}

export const initialState: UserGitHubState = {
  repos: [],

  error: null,
};

export const userGitHubReducer = createReducer(
  initialState,
  on(loadUserReposSuccess, (state, { payload }) => ({ ...state, payload })),
  on(loadUserReposNotFound, (state, { payload }) => ({ ...state, payload }))
);