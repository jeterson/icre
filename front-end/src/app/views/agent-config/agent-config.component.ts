import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoNotificationService, PoDialogService, PoBreadcrumb } from '@portinari/portinari-ui';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent-config',
  templateUrl: './agent-config.component.html',
  styleUrls: ['./agent-config.component.css']
})
export class AgentConfigComponent implements OnInit {

  selectionAgentType = 2;
  agentAddress = 'localhost';
  agentPort = 5170;
  loading = false;
  urlDownload = 'https://drive.google.com/open?id=1crCrdet828EDUNcHXETN4m31SqFJGhAP';
  actions: PoPageAction[] = [
    { label: 'Salvar', action: this.save.bind(this) },
    { label: 'Cancelar', url: '/' },

  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Configurar Agente', }
    ]
  };
  constructor(
    private agentService: AgentService,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService) { }

  ngOnInit() {
    const config = this.agentService.getConfig();
    this.agentAddress = config.url;
    this.agentPort = config.port;
  }

  save() {
    this.agentService.saveConfig(this.agentAddress, this.agentPort);
    this.poNotification.success('Configuraçõe salvas');
  }

  test() {
    this.loading = true;
    this.agentService._test().subscribe(res => {
      this.poNotification.success('O agente está ativo');
      this.loading = false;
    }, err => {
      this.loading = false;
      const message = `
        Erro: ${err.message} .
        O agente de impressão não está disponivel no endereço http://${this.agentAddress}:${this.agentPort}/.
        Certifique-se de que o aplicativo do agente esteja sendo excecutado e ouvindo na porta informada.
      `;
      this.poDialog.alert({
        title: 'Erro ao se comunicar com o Agente',
        message,
      });
    });
  }

  downloadAgent() {
    const win = window.open(this.urlDownload, '_blank');
    win.focus();
  }

}
