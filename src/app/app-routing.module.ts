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
      // {
      //   path: 'niveau/add',
      //   component: NiveauAddComponent
      // },
      // {
      //   path: 'niveau/show',
      //   component: NiveauShowComponent
      // },
      // {
      //   path: 'exercice/add',
      //   component: ExerciceAddComponent
      // },
      // {
      //   path: 'exercice/add/file',
      //   component:ExerciceAddFileComponent
      // },
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
      },

      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then((m) => m.ThemeModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then((m) => m.BaseModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then((m) => m.ButtonsModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/charts.module').then((m) => m.ChartsModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then((m) => m.IconsModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then((m) => m.NotificationsModule),
        canActivate: [CanLoginGuard]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
        canActivate: [CanLoginGuard]
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
