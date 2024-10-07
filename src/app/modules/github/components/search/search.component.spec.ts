import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { NetworkService } from '../../../../services/network.service';
import { getUser, getUsers, loadUserRepos, getUserSuccess, loadUserReposSuccess } from '../../store/user-git-hub.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;
  let networkService: jasmine.SpyObj<NetworkService>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const networkServiceSpy = jasmine.createSpyObj('NetworkService', ['onlineStatus$']);
    networkServiceSpy.onlineStatus$ = of(true);

    await TestBed.configureTestingModule({
      imports: [
        SearchComponent, 
        CommonModule, 
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatIconModule,
        NoopAnimationsModule 
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NetworkService, useValue: networkServiceSpy },
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    networkService = TestBed.inject(NetworkService) as jasmine.SpyObj<NetworkService>;

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getUser and loadUserRepos when online and searching for a username', () => {
    component.isOffline = false;
    component.username = 'johnDoe';

    component.searchUser();

    expect(store.dispatch).toHaveBeenCalledWith(getUser({ payload: 'johnDoe' }));
    expect(store.dispatch).toHaveBeenCalledWith(loadUserRepos({ payload: 'johnDoe' }));
    expect(router.navigate).toHaveBeenCalledWith(['/profile', 'johnDoe']);
  });

  it('should load user from cache when offline and searching for a username', () => {
    component.isOffline = true;
    const cachedUsers = {
      johnDoe: {
        userData: { name: 'John Doe', login: 'johnDoe' },
        repos: [{ name: 'Repo1', stargazers_count: 120, description: 'Repo1 description' }]
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cachedUsers));

    component.username = 'johnDoe';
    component.searchUser();

    expect(store.dispatch).toHaveBeenCalledWith(getUserSuccess({ payload: cachedUsers.johnDoe.userData }));
    expect(store.dispatch).toHaveBeenCalledWith(loadUserReposSuccess({ payload: cachedUsers.johnDoe.repos }));
    expect(router.navigate).toHaveBeenCalledWith(['/profile', 'johnDoe']);
  });

  it('should navigate to /users when username is empty', () => {
    component.username = '';
    component.searchUser();

    expect(store.dispatch).toHaveBeenCalledWith(getUsers());
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should log "Usuário não encontrado no cache" when username is not in cache', () => {
    component.isOffline = true;
    spyOn(localStorage, 'getItem').and.returnValue('{}');
    spyOn(console, 'log');

    component.username = 'unknownUser';
    component.searchUser();

    expect(console.log).toHaveBeenCalledWith('Usuário não encontrado no cache.');
  });
});
