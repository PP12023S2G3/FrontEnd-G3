import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactoViewComponent } from './views/contacto-view/contacto-view.component';
import { ModeloViewComponent } from './views/modelo-view/modelo-view.component';
import { HistorialViewComponent } from './views/historial-view/historial-view.component';
import { DiagnosticViewComponent } from './views/diagnostic-view/diagnostic-view.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

//PRIMENG
import { PanelModule } from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'
import { InicioViewComponent } from './views/inicio-view/inicio-view.component';
import { FormDiagnosticComponent } from './views/diagnostic-view/form-diagnostic/form-diagnostic.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FooterComponent } from './shared/footer/footer.component';
import { ResultViewComponent } from './views/result-view/result-view.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { RegistroComponent } from './views/registro-view/registro-view.component';
import { NewPasswordViewComponent } from './views/new-password-view/new-password-view.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { LogoutService } from './shared/logout/logout.service';
import { LogoutComponent } from './shared/logout/logout.component';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContactoViewComponent,
    ModeloViewComponent,
    HistorialViewComponent,
    InicioViewComponent,
    DiagnosticViewComponent,
    FormDiagnosticComponent,
    LoginComponent,
    FooterComponent,
    ResultViewComponent,
    ResetPasswordComponent,
    NavbarComponent,
    RegistroComponent,
    NewPasswordViewComponent,
    LoginViewComponent,
    LogoutComponent
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
    FileUploadModule,
    DialogModule,
    SidebarModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    MessageModule,
    ToastModule,
    InputTextareaModule,
    TriStateCheckboxModule,
    CheckboxModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
