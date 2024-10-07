import { createReducer, on } from '@ngrx/store';
import * as fromGitHubAction from './user-git-hub.actions';
import { RepositoryModel, UserModel } from '../../../shared/models/gihthub/github.model';

export interface UserGitHubState {
  repos: RepositoryModel[];
  loading: boolean;
  error: string | null;
  users: UserModel[];
  user: UserModel | null;
}

export const initialState: UserGitHubState = {
  repos: [],
  loading: false,
  users: [],
  user: null,

  error: null,
};

export const userGitHubReducer = createReducer(
  initialState,
  
  on(fromGitHubAction.loadUserReposSuccess, (state, { payload }) => {
    console.log('Reducer: loadUserReposSuccess acionado!', payload);
    return {
      ...state, 
      repos: payload,
      loading: false,
      error: null
    };
  }),

  on(fromGitHubAction.loadUserReposNotFound, (state, { payload }) => {
    console.log('Reducer: loadUserReposNotFound acionado!', payload);
    return {
      ...state,
      loading: false,
      repos: [],
      error: 'Repositories not found'
    };
  }),

  on(fromGitHubAction.getUsersSuccess, (state, { payload }) => {
    console.log('Reducer: getUsersSuccess acionado!', payload);
    return {
      ...state, 
      users: payload,
      loading: false,
      error: null
    };
  }),

  on(fromGitHubAction.getUsersFailure, (state, { payload }) => {
    console.log('Reducer: getUsersFailure acionado!', payload);
    return {
      ...state, 
      loading: false,
      users: [],
      error: payload
    };
  }),

  on(fromGitHubAction.getUserSuccess, (state, { payload }) => {
    console.log('Reducer: getUserSuccess acionado!', payload);
    return {
      ...state, 
      loading: false,
      error: null,
      user: payload
    };
  }),

  on(fromGitHubAction.getUserFailure, (state, { payload }) => {
    console.log('Reducer: getUserFailure acionado!', payload);
    return {
      ...state, 
      loading: false,
      error: payload
    };
  }),
);
