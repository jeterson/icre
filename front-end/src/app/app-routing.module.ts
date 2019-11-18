import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteCadastroComponent } from './views/clientes/cliente-cadastro/cliente-cadastro.component';
import { MenuComponent } from './components/menu/menu.component';
import { BancoListComponent } from './views/banco/banco-list/banco-list.component';
import { BancoCadastroComponent } from './views/banco/banco-cadastro/banco-cadastro.component';
import { ParametrosComponent } from './views/parametros/parametros.component';
import { ClienteListComponent } from './views/clientes/cliente-list/cliente-list.component';
import { ClienteDetailComponent } from './views/clientes/cliente-detail/cliente-detail.component';
import { AgentConfigComponent } from './views/agent-config/agent-config.component';
import { PrinterConfigComponent } from './views/printer-config/printer-config.component';
import { ModelsConfigComponent } from './views/models-config/models-config.component';
import { VariaveisComponent } from './views/variaveis/variaveis.component';
import { HomeComponent } from './views/home/home.component';
import { BackupManagerComponent } from './views/backup-manager/backup-manager.component';
import { ApiComponent } from './views/api/api.component';


const routes: Routes = [
  {
    path: '', component: MenuComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'cadastros/cliente-list', component: ClienteListComponent },
      { path: 'cadastros/cliente-cadastro', component: ClienteCadastroComponent },
      { path: 'cadastros/cliente-edit/:id', component: ClienteCadastroComponent },
      { path: 'cadastros/cliente-detalhes/:id', component: ClienteDetailComponent },
      { path: 'cadastros/banco-list', component: BancoListComponent },
      { path: 'cadastros/banco-cadastro', component: BancoCadastroComponent },
      { path: 'cadastros/banco-cadastro/:id', component: BancoCadastroComponent },
      { path: 'sistema/parametros', component: ParametrosComponent },
      { path: 'sistema/agent-config', component: AgentConfigComponent },
      { path: 'sistema/printer-config', component: PrinterConfigComponent },
      { path: 'sistema/models-config', component: ModelsConfigComponent },
      { path: 'cadastros/variaveis', component: VariaveisComponent },
      { path: 'sistema/backup-manager', component: BackupManagerComponent },
      { path: 'sistema/api-config', component: ApiComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
