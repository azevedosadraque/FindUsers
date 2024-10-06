import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { userGitHubReducer } from './app/modules/github/store/user-git-hub.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserGitHubEffects } from './app/modules/github/store/user-git-hub.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) ,
    provideHttpClient(), 
    provideStore({user: userGitHubReducer}),
    provideEffects([UserGitHubEffects])
  ]
})
.catch(err => console.error(err));
