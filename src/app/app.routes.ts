import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  // Future routes will be added here
  // { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  // { path: 'services', loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent) },
  // { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' } // Wildcard route for 404 page
];
