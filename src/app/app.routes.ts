import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';

const loadLanding = () =>
  import('@landing/landing-page.component').then(
    c => c.LandingPageComponent
  );

const loadSimplePage = () =>
  import('@pages/simple-page.component').then(
    c => c.SimplePageComponent
  );

const loadContactPage = () =>
  import('@pages/contact-page.component').then(
    c => c.ContactPageComponent
  );

const loadBookTrainingPage = () =>
  import('@pages/book-training-page.component').then(
    c => c.BookTrainingPageComponent
  );

const loadAdminDashboard = () =>
  import(
    '@admin/components/admin-dashboard/admin-dashboard.component'
  ).then(c => c.AdminDashboardComponent);

const loadAdminContent = () =>
  import('@admin/components/content-editor/content-editor.component').then(
    c => c.ContentEditorComponent
  );

const loadAdminLogin = () =>
  import('@admin/components/admin-login/admin-login.component').then(
    c => c.AdminLoginComponent
  );

const simplePage = (title: string, description: string) => ({
  loadComponent: loadSimplePage,
  data: { title, description }
});

export const routes: Routes = [
  {
    path: '',
    loadComponent: loadLanding
  },
  {
    path: 'osiagniecia',
    ...simplePage(
      'Osiągnięcia',
      'Tu pojawią się case study i konkretne liczby z pracy z klientami.'
    )
  },
  {
    path: 'przemiany',
    ...simplePage(
      'Przemiany',
      'Galeria metamorfoz i krótkie historie osób, które zaufały StrongYou.'
    )
  },
  {
    path: 'galeria',
    ...simplePage(
      'Galeria',
      'Przestrzeń na zdjęcia z treningów i kulisy pracy w studiu.'
    )
  },
  {
    path: 'o-mnie',
    ...simplePage(
      'O mnie',
      'Miejsce na bio trenera, certyfikaty i filozofię pracy.'
    )
  },
  {
    path: 'kontakt',
    loadComponent: loadContactPage
  },
  {
    path: 'umow-trening',
    loadComponent: loadBookTrainingPage
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        canActivate: [adminGuard],
        loadComponent: loadAdminDashboard
      },
      {
        path: 'content',
        canActivate: [adminGuard],
        loadComponent: loadAdminContent
      },
      {
        path: 'login',
        loadComponent: loadAdminLogin
      },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: '' }
];
