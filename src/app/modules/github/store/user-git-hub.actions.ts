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

export const getUsers = createAction(
    userGitHubTypeAction.GET_USERS
)

export const getUsersSuccess = createAction(
    userGitHubTypeAction.GET_USERS_SUCCESS,
    props<{payload: any}>()
)
export const getUsersFailure = createAction(
    userGitHubTypeAction.GET_USERS_FAILURE,
    props<{payload: any}>()
)

export const getUser = createAction(
    userGitHubTypeAction.GET_USER,
    props<{ payload: string}> ()
)
export const getUserSuccess = createAction(
    userGitHubTypeAction.GET_USER_SUCCESS,
    props<{payload: any}>()
)
export const getUserFailure = createAction(
    userGitHubTypeAction.GET_USER_FAILURE,
    props<{payload: any}>()
)