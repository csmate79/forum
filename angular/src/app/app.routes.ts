import { Routes } from '@angular/router';

const lazyImports = {
  AdminPage: () =>
    import('./admin-page/admin-page.module').then(
      (module) => module.AdminPageModule
    ),
  ProfilePage: () =>
    import('./profile-page/profile-page.module').then(
      (module) => module.ProfilePageModule
    ),
  HomePage: () =>
    import('./home-page/home-page.module').then(
      (module) => module.HomePageModule
    ),
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'admin',
    loadChildren: () => lazyImports.AdminPage(),
  },
  {
    path: 'profile',
    loadChildren: () => lazyImports.ProfilePage(),
  },
  {
    path: 'home',
    loadChildren: () => lazyImports.HomePage(),
  },
];
