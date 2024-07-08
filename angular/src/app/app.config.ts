import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { HasPermissionPipe } from './pipes/has-permission.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideStore(),
    importProvidersFrom(StoreModule.forRoot({ auth: authReducer })),
    HasPermissionPipe, provideAnimationsAsync(),
  ],
};
