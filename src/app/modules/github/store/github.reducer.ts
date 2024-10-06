import { createReducer, on } from '@ngrx/store';
import { loadUserRepos, loadUserReposSuccess, loadUserReposNotFound } from './github.actions';

export interface UserState {
  repos: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  repos: [],
  loading: false, 

  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUserReposSuccess, (state, { payload }) => ({ ...state, payload })),
  on(loadUserReposNotFound, (state, { payload }) => ({ ...state, payload }))
);