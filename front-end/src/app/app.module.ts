import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@portinari/portinari-ui';
import { RouterModule } from '@angular/router';
import { ClienteCadastroComponent } from './views/clientes/cliente-cadastro/cliente-cadastro.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BancoListComponent } from './views/banco/banco-list/banco-list.component';
import { BancoCadastroComponent } from './views/banco/banco-cadastro/banco-cadastro.component';
import { PoPageDynamicEditModule, PoPageDynamicDetailModule } from '@portinari/portinari-templates';
import { environment } from 'src/environments/environment';
import { BaseUrlInterceptor } from './services/baseurl-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParametrosComponent } from './views/parametros/parametros.component';
import { ClienteListComponent } from './views/clientes/cliente-list/cliente-list.component';
import { ClienteDetailComponent } from './views/clientes/cliente-detail/cliente-detail.component';
import { AgentConfigComponent } from './views/agent-config/agent-config.component';
import { PrinterConfigComponent } from './views/printer-config/printer-config.component';
import { ModelsConfigComponent } from './views/models-config/models-config.component';
import { AgentInativoComponent } from './components/agent-inativo/agent-inativo.component';
import { ImpressaoDialogComponent } from './components/impressao-dialog/impressao-dialog.component';
import { VariaveisComponent } from './views/variaveis/variaveis.component';
import { PoCodeEditorModule } from '@portinari/portinari-code-editor';
import { HomeComponent } from './views/home/home.component';
import { BackupManagerComponent } from './views/backup-manager/backup-manager.component';
import { ApiComponent } from './views/api/api.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteCadastroComponent,
    MenuComponent,
    BancoListComponent,
    BancoCadastroComponent,
    ParametrosComponent,
    ClienteListComponent,
    ClienteDetailComponent,
    AgentConfigComponent,
    PrinterConfigComponent,
    ModelsConfigComponent,
    AgentInativoComponent,
    ImpressaoDialogComponent,
    VariaveisComponent,
    HomeComponent,
    BackupManagerComponent,
    ApiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    FormsModule,
    CommonModule,
    PoPageDynamicEditModule,
    PoPageDynamicDetailModule,
    ReactiveFormsModule,
    PoCodeEditorModule

    //  RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
