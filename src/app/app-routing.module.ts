import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoViewComponent } from './views/contacto-view/contacto-view.component';
import { ModeloViewComponent } from './views/modelo-view/modelo-view.component';
import { HistorialViewComponent } from './views/historial-view/historial-view.component';
import { DiagnosticViewComponent } from './views/diagnostic-view/diagnostic-view.component';
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { LoginComponent } from './login/login.component';
import { ResultViewComponent } from './views/result-view/result-view.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';


const routes: Routes = [
  { path: 'contacto', component: ContactoViewComponent },
  { path: 'modelo', component: ModeloViewComponent },
  { path: 'historial', component: HistorialViewComponent },
  { path: 'diagnostic', component: DiagnosticViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'result', component: ResultViewComponent },
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: '', component: InicioViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
