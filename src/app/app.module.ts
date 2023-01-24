import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { ToastrModule } from 'ngx-toastr';

import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  OffcanvasModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TableModule,
  TabsModule,
  ToastModule,
  UtilitiesModule
} from '@coreui/angular';
import { MatExpansionModule } from '@angular/material/expansion';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LoginComponent } from './registration/login/login.component';
import { ForgetpasswordComponent } from './registration/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './registration/resetpassword/resetpassword.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthInterceptor } from './registration/interceptor/AuthInterceptor';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignupComponent } from './registration/signup/signup.component';
import { CanLoginGuard } from './registration/can-login.guard';
import { ActivecompteComponent } from './activecompte/activecompte.component';

import { MatSliderModule } from '@angular/material/slider';
import { ExerciceAddComponent } from './components/exercice/exercice-add/exercice-add.component';
import { ExerciceShowComponent } from './components/exercice/exercice-show/exercice-show.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MultipleAnswersComponent } from './components/exercice/exercice-types/multiple-answers/multiple-answers.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToasterWrapperComponent } from './toaster-wrapper/toaster-wrapper.component';
import { ToastSampleComponent } from './toaster-wrapper/toast-sample/toast-sample.component';
import { ToastSampleIconComponent } from './toaster-wrapper/toast-sample/toast-sample-icon/toast-sample-icon.component';
import { EspaceEnseignantComponent } from './espace-enseignant/espace-enseignant.component';
import { EspaceenseignantComponent } from './components/espaceenseignant/espaceenseignant.component';
import { AjouterChapitreComponent } from './ajouter-chapitre/ajouter-chapitre.component';
import { ModifierChapitreComponent } from './modifier-chapitre/modifier-chapitre.component';
import { AjouterExcerciceComponent } from './ajouter-excercice/ajouter-excercice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListExerciceComponent } from './list-exercice/list-exercice.component';
import { MapComponent } from './accueil/map/map.component';

//import { ActivecompteComponent } from './activecompte/activecompte.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
[CUSTOM_ELEMENTS_SCHEMA];
const APP_CONTAINERS = [DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    AccueilComponent,
    SignupComponent,
    ActivecompteComponent,
    ExerciceAddComponent,
    ExerciceShowComponent,
    ToasterWrapperComponent,
    ToastSampleComponent,
    ToastSampleIconComponent,
    EspaceEnseignantComponent,
    EspaceenseignantComponent,
    AjouterChapitreComponent,
    ModifierChapitreComponent,
    AjouterExcerciceComponent,
    ListExerciceComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    MatSortModule,
    MatSliderModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    MatCardModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatTreeModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    TableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxMatFileInputModule,
    MatExpansionModule,
    MatSidenavModule,

    OffcanvasModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    IconSetService,
    Title,
    CanLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
