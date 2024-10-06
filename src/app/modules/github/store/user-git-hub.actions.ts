import { userGitHubTypeAction as userGitHubTypeAction } from "./user-git-hub.type-action.enum"
import { createAction, props } from "@ngrx/store"

export const loadUserRepos = createAction(
    userGitHubTypeAction.LOAD_USER_REPOS,
    props<{payload: string}>()
)
export const loadUserReposSuccess = createAction(
    userGitHubTypeAction.LOAD_USER_REPOS_RESPONSE_SUCCESS,
    props<{payload: any}>()
)
export const loadUserReposNotFound = createAction(
    userGitHubTypeAction.LOAD_USER_REPOS_RESPONSE_NOT_FOUND,
    props<{payload: any}>()
)