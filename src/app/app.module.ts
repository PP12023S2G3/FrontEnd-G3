import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactoViewComponent } from './views/contacto-view/contacto-view.component';
import { ModeloViewComponent } from './views/modelo-view/modelo-view.component';
import { HistorialViewComponent } from './views/historial-view/historial-view.component';
import { FormularioViewComponent } from './views/formulario-view/formulario-view.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ContentComponent } from './shared/content/content.component';

//PRIMENG
import { PanelModule } from 'primeng/panel';
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ContactoViewComponent,
    ModeloViewComponent,
    HistorialViewComponent,
    FormularioViewComponent,
    InicioViewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
