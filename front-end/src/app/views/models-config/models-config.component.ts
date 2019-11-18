import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoPageAction, PoTableColumn, PoNotificationService } from '@portinari/portinari-ui';
import { AgentService } from 'src/app/services/agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-models-config',
  templateUrl: './models-config.component.html',
  styleUrls: ['./models-config.component.css']
})
export class ModelsConfigComponent implements OnInit {

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Modelos' }
    ]
  };
  actions: PoPageAction[] = [
    { label: 'Cancelar', url: '/' },
    { label: 'Salvar', action: this.saveDirModel, disabled: this.isSaveDisabled.bind(this) }
  ];
  columns: PoTableColumn[] = [
    { property: 'FileName', label: 'Nome' },
    { property: 'Path', label: 'Caminho Completo' },
  ];
  items = [];
  dir: string;
  agentAtivo = false;

  constructor(
    private agentService: AgentService,
    private poNotificarion: PoNotificationService,
    private router: Router) { }

  ngOnInit() {
    this.agentService.test().subscribe(res => this.agentAtivo = res);
    this.dir = this.agentService.getDocModelsDir();
  }

  saveDirModel() {
    this.agentService.saveDocModelsDir(this.dir);
    this.poNotificarion.success('Diretório salvo com sucesso');
  }

  verificarArquivos() {
    this.agentService.getDocModels(this.dir).subscribe(res => {
      this.items = res;
    }, err => {
      this.poNotificarion.error(err.error);
    });
  }

  isSaveDisabled() {
    return !this.agentAtivo || (this.items.length === 0);
  }

  goToConfig() {
    this.router.navigateByUrl('/sistema/agent-config');
  }

}
