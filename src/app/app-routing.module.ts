import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoViewComponent } from './views/contacto-view/contacto-view.component';
import { ModeloViewComponent } from './views/modelo-view/modelo-view.component';
import { HistorialViewComponent } from './views/historial-view/historial-view.component';


const routes: Routes = [
  { path: 'contacto', component: ContactoViewComponent },
  { path: 'modelo', component: ModeloViewComponent },
  { path: 'historial', component: HistorialViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
