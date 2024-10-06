import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserGitHubState } from "./user-git-hub.reducer";

const getUserGitHubFeatureState = createFeatureSelector<UserGitHubState>('userGitHub');

export const getUserGitHubRepos = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.repos
)

export const getUserGitHubError = createSelector(
    getUserGitHubFeatureState,
    (state: UserGitHubState) => state.error
)