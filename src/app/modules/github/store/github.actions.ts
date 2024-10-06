import { gitHubTypeAction as gitHubTypeAction } from "./github.type-action.enum"
import { createAction, props } from "@ngrx/store"

export const loadUserRepos = createAction(
    gitHubTypeAction.LOAD_USER_REPOS,
    props<{payload: string}>()
)
export const loadUserReposSuccess = createAction(
    gitHubTypeAction.LOAD_USER_REPOS_RESPONSE_SUCCESS,
    props<{payload: any}>()
)
export const loadUserReposNotFound = createAction(
    gitHubTypeAction.LOAD_USER_REPOS_RESPONSE_NOT_FOUND,
    props<{payload: any}>()
)