import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoViewComponent } from './views/contacto-view/contacto-view.component';
import { ModeloViewComponent } from './views/modelo-view/modelo-view.component';
import { HistorialViewComponent } from './views/historial-view/historial-view.component';
import { FormularioViewComponent } from './views/formulario-view/formulario-view.component';
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';


const routes: Routes = [
  { path: 'contacto', component: ContactoViewComponent },
  { path: 'modelo', component: ModeloViewComponent },
  { path: 'historial', component: HistorialViewComponent },
  { path: 'formulario', component: FormularioViewComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: InicioViewComponent },
  { path: 'resetPassword', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
