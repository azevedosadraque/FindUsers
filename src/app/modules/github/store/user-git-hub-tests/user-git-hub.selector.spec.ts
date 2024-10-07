import { getGitHubUsers, getGitHubError, getGitHubLoading, getGitHubUser, getGitHubUserRepos } from '../user-git-hub.selector';
import { UserGitHubState } from '../user-git-hub.reducer';
import { UserModel, RepositoryModel } from '../../../../shared/models/gihthub/github.model';

describe('UserGitHub Selectors', () => {

  const mockUsers: UserModel[] = [
    { name: 'John Doe', login: 'johndoe', bio: 'Software Developer', followers: 150, following: 100, location: 'San Francisco', avatar_url: 'avatar1_url' },
    { name: 'Jane Smith', login: 'janesmith', bio: 'Designer', followers: 200, following: 80, location: 'New York', avatar_url: 'avatar2_url' }
  ];

  const mockRepos: RepositoryModel[] = [
    { name: 'repo1', stargazers_count: 100, description: 'First Repo' },
    { name: 'repo2', stargazers_count: 150, description: 'Second Repo' }
  ];

  const initialState: UserGitHubState = {
    users: mockUsers,
    user: mockUsers[0],
    repos: mockRepos,
    loading: false,
    error: null,
  };

  it('should select GitHub users', () => {
    const result = getGitHubUsers.projector(initialState);
    expect(result).toEqual(mockUsers);
  });

  it('should select GitHub error', () => {
    const result = getGitHubError.projector(initialState);
    expect(result).toBeNull();
  });

  it('should select GitHub loading', () => {
    const result = getGitHubLoading.projector(initialState);
    expect(result).toBeFalse();
  });

  it('should select a GitHub user', () => {
    const result = getGitHubUser.projector(initialState);
    expect(result).toEqual(mockUsers[0]);
  });

  it('should select GitHub user repos', () => {
    const result = getGitHubUserRepos.projector(initialState);
    expect(result).toEqual(mockRepos);
  });
});
