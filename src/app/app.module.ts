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
import { FormsModule } from '@angular/forms';

//PRIMENG
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button'
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { ContentFormularioComponent } from './views/formulario-view/content-formulario/content-formulario.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FooterComponent } from './shared/footer/footer.component';
import { DescriptionComponent } from './shared/content/description/description.component';
import { ResultViewComponent } from './views/result-view/result-view.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ContactoViewComponent,
    ModeloViewComponent,
    HistorialViewComponent,
    InicioViewComponent,
    FormularioViewComponent,
    ContentFormularioComponent,
    LoginComponent,
    FooterComponent,
    DescriptionComponent,
    ResultViewComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
