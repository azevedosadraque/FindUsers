import { TestBed } from '@angular/core/testing';

import { GitUserService } from './git-user.service';

describe('GithubService', () => {
  let service: GitUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
