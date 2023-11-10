import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoViewComponent } from './views/contacto-view/contacto-view.component';
import { ModeloViewComponent } from './views/modelo-view/modelo-view.component';
import { HistorialViewComponent } from './views/historial-view/historial-view.component';
import { DiagnosticViewComponent } from './views/diagnostic-view/diagnostic-view.component';
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { ResultViewComponent } from './views/result-view/result-view.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { RegistroComponent } from './views/registro-view//registro-view.component';
import { NewPasswordViewComponent } from './views/new-password-view/new-password-view.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { AuthGuard } from './auth/AuthGuard';
import { TwofactorViewComponent } from './views/two-factor-view/two-factor-view.component';

const routes: Routes = [
  { path: 'contacto',
   component: ContactoViewComponent,
   canActivate: [AuthGuard],
   data: {
     allowedRoles: ['Auditor', 'Medico', 'ProfDelaSalud'],
   }
   },
  { path: 'modelo', component: ModeloViewComponent,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico', 'ProfDelaSalud'],
  } },
  { path: 'historial', component: HistorialViewComponent,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico'],
  }
 },
  { path: 'diagnostico', component: DiagnosticViewComponent,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'ProfDelaSalud'],
  }
},
  { path: 'login', component: LoginViewComponent },
  { path: 'result', component: ResultViewComponent ,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico'],
  }},
  { path: 'resetPassword', component: ResetPasswordComponent,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico', 'ProfDelaSalud', 'Administrador'],
  }},
  { path: 'register', component: RegistroComponent,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico', 'ProfDelaSalud', 'Administrador'],
  }},
  { path: '', component: InicioViewComponent },
  { path: 'new-password', component: NewPasswordViewComponent ,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico', 'ProfDelaSalud', 'Administrador'],
  }},
  { path: 'logout', component: LogoutComponent,
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Auditor', 'Medico', 'ProfDelaSalud'],
  } },
  { path: 'two-factor', component: TwofactorViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
