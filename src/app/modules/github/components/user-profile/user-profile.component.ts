import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { RepositoryModel, UserModel } from '../../../../shared/models/gihthub/github.model';
import { Store } from '@ngrx/store';
import { getGitHubUser, getGitHubUserRepos, getGitHubUsers } from '../../store/user-git-hub.selector';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,  
    MatPaginatorModule,  
    MatSortModule,
    MatIconModule
  ]
})
export class UserProfileComponent implements OnInit {
  user$: Observable<UserModel> = new Observable<UserModel>();

  userData: UserModel | null = null

  repoData = new MatTableDataSource<RepositoryModel>([]); 

  displayedColumns: string[] = ['name', 'stargazers_count', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private location: Location) {}

  ngOnInit(): void {
    this.store.select(getGitHubUser).subscribe(user => {
      this.userData = user!;
    });
    this.store.select(getGitHubUserRepos).subscribe(repos => {
      if (repos) {
        this.repoData.data = repos;
        this.repoData.paginator = this.paginator;
        this.repoData.sort = this.sort; 

        this.repoData.sortingDataAccessor = (item: RepositoryModel, property: string) => {
          switch (property) {
            case 'stargazers_count': 
              return item.stargazers_count;
            case 'name': 
              return item.name.toLowerCase();
            default:
              return '';
          }
        };
      }
    })
  }

  goBack(): void {
    this.location.back();
  }
}
