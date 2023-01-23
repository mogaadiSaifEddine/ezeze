import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ActivecompteComponent } from './activecompte/activecompte.component';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './registration/login/login.component';
import { AjouterExcerciceComponent } from './ajouter-excercice/ajouter-excercice.component';
import { CanLoginGuard } from './registration/can-login.guard';

import { ModifierChapitreComponent } from './modifier-chapitre/modifier-chapitre.component';
import { ExerciceShowComponent } from './components/exercice/exercice-show/exercice-show.component';
import { EspaceEnseignantComponent } from './espace-enseignant/espace-enseignant.component';
import { AjouterChapitreComponent } from './ajouter-chapitre/ajouter-chapitre.component';
import { ListExerciceComponent } from './list-exercice/list-exercice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'exercice/show',
        component: ExerciceShowComponent
      },
      {
        path: 'espaceEnseignant',
        component: EspaceEnseignantComponent
      },
      {
        path: 'AjouterChapitre',
        component: AjouterChapitreComponent
      },
      {
        path: 'ModifierChapitre',
        component: ModifierChapitreComponent
      },
      {
        path: 'AjouterExcercice',
        component: AjouterExcerciceComponent
      },
      {
        path: 'ListExercice',
        component: ListExerciceComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'enseignant',
        loadChildren: () => import('./components/enseignant/enseignant.module').then((m) => m.EnseignantModule)
      },
      {
        path: 'admin-panel',
        loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'espace-parent',
        loadChildren: () => import('./components/espace-parent/espace-parent.module').then((m) => m.EspaceParentModule)
      },
      {
        path: 'revision',
        loadChildren: () => import('./components/revision/revision.module').then((m) => m.RevisionModule)
      },
      {
        path: 'clubs',
        loadChildren: () => import('./components/club/club.module').then((m) => m.ClubModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./components/chat/chat.module').then((m) => m.ChatModule)
      }
    ]
  },

  //{path: '**', redirectTo: 'dashboard'},
  // {path:"acceuil",redirectTo:'active'},
  { path: 'login', component: LoginComponent },

  { path: 'accueil', component: AccueilComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'active', component: ActivecompteComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
