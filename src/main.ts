import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { userGitHubReducer } from './app/modules/github/store/user-git-hub.reducer';
import { provideEffects } from '@ngrx/effects';
import * as e from './app/modules/github/store/user-git-hub.effects';
import { GitHubApiService } from './app/shared/services/github-api/github-api.service';
import { GitUserService } from './app/modules/github/services/git-user.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

console.log('Bootstrapping application...');  // Adicione este log

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: userGitHubReducer }),
    provideEffects(e),
    GitHubApiService,
    GitUserService, provideAnimationsAsync(),
  ]
})
.then(() => console.log('Application bootstrapped successfully'))
.catch(err => {
  console.error('Error during app bootstrap:', err);
});


