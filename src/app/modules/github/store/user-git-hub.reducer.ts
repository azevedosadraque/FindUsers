import { createReducer, on } from '@ngrx/store';
import { loadUserReposSuccess, loadUserReposNotFound } from './user-git-hub.actions';

export interface UserGitHubState {
  repos: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserGitHubState = {
  repos: [],
  loading: false,

  error: null,
};

export const userGitHubReducer = createReducer(
  initialState,
  on(loadUserReposSuccess, (state) => ({ ...state, loading: true  })),
  on(loadUserReposNotFound, (state) => ({ ...state, loading: false }))
);