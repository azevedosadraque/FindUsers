import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserModel } from '../../../../shared/models/gihthub/github.model';
import { getGitHubUsers } from '../../store/user-git-hub.selector';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Store } from '@ngrx/store';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockStore: any;
  let paginator: MatPaginator;

  const mockUsers: UserModel[] = [
    {
      name: 'John Doe',
      login: 'johndoe',
      bio: 'Software Developer',
      followers: 150,
      following: 100,
      location: 'San Francisco',
      avatar_url: 'avatar1_url'
    },
    {
      name: 'Jane Smith',
      login: 'janesmith',
      bio: 'Designer',
      followers: 200,
      following: 80,
      location: 'New York',
      avatar_url: 'avatar2_url'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getGitHubUsers, value: mockUsers }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
    paginator = TestBed.createComponent(MatPaginator).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users$ and dataSource on ngOnInit', () => {
    spyOn(mockStore, 'select').and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should display correct columns', () => {
    const expectedColumns = ['avatar', 'login'];
    expect(component.displayedColumns).toEqual(expectedColumns);
  });
});
