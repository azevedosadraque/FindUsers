import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserGitHubState } from "./user-git-hub.reducer";

const getUserGitHubFeatureState = createFeatureSelector<UserGitHubState>('userGitHub');

export const getGitHubUsers = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.users
)

export const getGitHubError = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.error
)

export const getGitHubLoading = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.loading
)

export const getGitHubUser = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.user
)

export const getGitHubUserRepos = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.repos
)