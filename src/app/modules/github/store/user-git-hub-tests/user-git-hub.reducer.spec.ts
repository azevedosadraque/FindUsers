import { userGitHubReducer, initialState, UserGitHubState } from '../user-git-hub.reducer';
import * as fromGitHubAction from '../user-git-hub.actions';
import { RepositoryModel, UserModel } from '../../../../shared/models/gihthub/github.model';

describe('UserGitHubReducer', () => {

  const mockRepos: RepositoryModel[] = [
    { name: 'repo1', stargazers_count: 100, description: 'First Repo' },
    { name: 'repo2', stargazers_count: 150, description: 'Second Repo' }
  ];

  const mockUsers: UserModel[] = [
    { name: 'John Doe', login: 'johndoe', bio: 'Software Developer', followers: 150, following: 100, location: 'San Francisco', avatar_url: 'avatar1_url' },
    { name: 'Jane Smith', login: 'janesmith', bio: 'Designer', followers: 200, following: 80, location: 'New York', avatar_url: 'avatar2_url' }
  ];

  const mockUser: UserModel = { name: 'John Doe', login: 'johndoe', bio: 'Software Developer', followers: 150, following: 100, location: 'San Francisco', avatar_url: 'avatar1_url' };

  it('should handle loadUserReposSuccess', () => {
    const action = fromGitHubAction.loadUserReposSuccess({ payload: mockRepos });
    const state = userGitHubReducer(initialState, action);

    expect(state.repos).toEqual(mockRepos);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle loadUserReposNotFound', () => {
    const action = fromGitHubAction.loadUserReposNotFound({ payload: null });
    const state = userGitHubReducer(initialState, action);

    expect(state.repos).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Repositories not found');
  });

  it('should handle getUsersSuccess', () => {
    const action = fromGitHubAction.getUsersSuccess({ payload: mockUsers });
    const state = userGitHubReducer(initialState, action);

    expect(state.users).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle getUsersFailure', () => {
    const errorMessage = 'Failed to fetch users';
    const action = fromGitHubAction.getUsersFailure({ payload: errorMessage });
    const state = userGitHubReducer(initialState, action);

    expect(state.users).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('should handle getUserSuccess', () => {
    const action = fromGitHubAction.getUserSuccess({ payload: mockUser });
    const state = userGitHubReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle getUserFailure', () => {
    const errorMessage = 'Failed to fetch user';
    const action = fromGitHubAction.getUserFailure({ payload: errorMessage });
    const state = userGitHubReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });
});
