import { Routes } from '@angular/router';

import { PersonajeListComponent } from './components/personaje-list/personaje-list.component';
import { PersonajeDetailComponent } from './components/personaje-detail/personaje-detail.component';

export const routes: Routes = [
  {
    path: 'lista-personajes',
    component: PersonajeListComponent,
  },
  {
    path: 'detalle/:id',
    component: PersonajeDetailComponent,
  },
  {
    path: '',
    redirectTo: 'lista-personajes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'lista-personajes',
  },
];
