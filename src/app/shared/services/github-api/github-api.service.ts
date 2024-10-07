import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { RepositoryModel, UserModel } from "../../models/gihthub/github.model";

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {
  private apiBaseUrl = 'https://api.github.com/users';

  constructor(private readonly http: HttpClient) {
    console.log('GitHubApiService initialized');
  }

  getUser(username: string): Observable<UserModel> {
    const url = `${this.apiBaseUrl}/${username}`;
    return this.http.get<UserModel>(url)
      .pipe(
        catchError(this.handleApiError)
      );
  }
  
  getUsers(perPage: number = 30, since: number = 0): Observable<UserModel[]> {
    const url = `${this.apiBaseUrl}?per_page=${perPage}&since=${since}`;
    return this.http.get<UserModel[]>(url).pipe(
      catchError(this.handleApiError)
    );
  }

  getUserRepos(username: string): Observable<RepositoryModel[]> {
    const url = `${this.apiBaseUrl}/${username}/repos`;
    return this.http.get<RepositoryModel[]>(url)
      .pipe(
        catchError(this.handleApiError)
      );
  }

  filterRepositories(
    repos: RepositoryModel[], 
    filterBy: { stars?: 'asc' | 'desc', name?: 'asc' | 'desc' }
  ): RepositoryModel[] {
    let filteredRepos = [...repos];

    if (filterBy.stars) {
      filteredRepos = filteredRepos.sort((a, b) => 
        filterBy.stars === 'asc' ? a.stargazers_count - b.stargazers_count : b.stargazers_count - a.stargazers_count
      );
    }

    if (filterBy.name) {
      filteredRepos = filteredRepos.sort((a, b) => 
        filterBy.name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }

    return filteredRepos;
  }

  private handleApiError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}