import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../shared/models/api-response.model';
import { GitHubUserModel } from '../../../shared/models/gihthub/github.model';
import { GitHubApiService } from '../../../shared/services/github-api/github-api.service';

@Injectable({
  providedIn: 'root',
})
export class GitUserService {

  constructor(
    private gitHubApiService: GitHubApiService
  ) {}

  getUserRepos(username: string): Observable<ApiResponseModel<GitHubUserModel>> {
    return this.gitHubApiService.get<GitHubUserModel>();
  }
}
