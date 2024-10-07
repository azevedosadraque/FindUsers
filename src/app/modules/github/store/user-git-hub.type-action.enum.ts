export const enum userGitHubTypeAction{
    LOAD_USER_REPOS = '[LOAD_USER_REPOS] LOAD USER REPOS',
    LOAD_USER_REPOS_RESPONSE_SUCCESS = '[LOAD_USER_REPOS_RESPONSE_SUCCESS] LOAD USER REPOS RESPONSE SUCCESS',
    LOAD_USER_REPOS_RESPONSE_NOT_FOUND = '[LOAD_USER_REPOS_RESPONSE_NOT_FOUND] LOAD USER REPOS NOT FOUND',

    GET_USERS = '[GET_USERS] GET USERS',
    GET_USERS_SUCCESS = '[GET_USERS_SUCCESS] GET USERS SUCCESS',
    GET_USERS_FAILURE = '[GET_USERS_FAILURE] GET USERS FAILURE',

    GET_USER = '[GET_USER] GET USER',
    GET_USER_SUCCESS = '[GET_USER_SUCCESS] GET USER SUCCESS',
    GET_USER_FAILURE = '[GET_USER_FAILURE] GET USER FAILURE',
}
