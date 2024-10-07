import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserModel, RepositoryModel } from '../../../../shared/models/gihthub/github.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let store: jasmine.SpyObj<Store>;
  let location: jasmine.SpyObj<Location>;

  const mockUser: UserModel = {
    login: 'johndoe',
    avatar_url: 'avatar.png',
    name: 'John Doe',
    bio: 'Software Engineer',
    followers: 100,
    following: 50,
    location: 'San Francisco, USA'
  };

  const mockRepos: RepositoryModel[] = [
    { name: 'Repo1', stargazers_count: 120, description: 'First Repo' },
    { name: 'Repo2', stargazers_count: 80, description: 'Second Repo' }
  ];

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    storeSpy.select.and.callFake((selector: any) => {
      if (selector === 'getGitHubUser') {
        return of(mockUser);
      } else if (selector === 'getGitHubUserRepos') {
        return of(mockRepos); 
      }
      return of(null); 
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        NoopAnimationsModule,
        UserProfileComponent
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Location, useValue: locationSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call location.back when goBack is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
