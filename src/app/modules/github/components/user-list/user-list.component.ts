import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserModel } from '../../../../shared/models/gihthub/github.model';
import { getGitHubUsers } from '../../store/user-git-hub.selector';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class UserListComponent implements OnInit {
  users$: Observable<UserModel[]> = new Observable<UserModel[]>();
  displayedColumns: string[] = ['avatar', 'login'];
  dataSource = new MatTableDataSource<UserModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getGitHubUsers).subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator; 
    });
  }
}
