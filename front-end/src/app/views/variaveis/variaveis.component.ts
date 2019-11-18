import { Component, OnInit, ViewChild } from '@angular/core';
import { VariaveisService } from 'src/app/services/variaveis.service';
import { PoTableColumn, PoBreadcrumb, PoModalAction, PoModalComponent, PoNotificationService } from '@portinari/portinari-ui';
import { ConcatSource } from 'webpack-sources';


@Component({
  selector: 'app-variaveis',
  templateUrl: './variaveis.component.html',
  styleUrls: ['./variaveis.component.css']
})
export class VariaveisComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(private variaveisService: VariaveisService, private poNotification: PoNotificationService) { }

  items = [];
  currentVar;
  columns: PoTableColumn[] = [
    {
      property: 'acoes', label: 'Ações', type: 'icon', icons: [
        { icon: 'po-icon-edit', action: this.edit.bind(this), value: 'editar' }
      ]
    },
    { property: 'id', label: 'Código' },
    { property: 'chave', label: 'Chave' },
    {
      property: 'valor', label: 'Valor',
    },
    {
      property: 'propriedade', label: 'Propriedade'
    },
    { property: 'descricao', label: 'Descrição' }
  ];
  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Variáveis' },
    ]
  };
  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar',

  };

  confirm: PoModalAction = {
    action: () => {
      this.saveParam();
    },
    label: 'Salvar',
    danger: true
  };

  funcaoJs = 'N';
  log;
  param;
  funcaoComErro = true;

  ngOnInit() {
    this.getData();
  }

  closeModal() {
    this.poModal.close();
  }

  edit(value) {
    this.currentVar = value;
    if (this.variaveisService.isJsFunction(value.valor)) {
      this.funcaoJs = 'S';
    }
    this.poModal.open();
  }

  saveParam() {
    if (this.funcaoJs === 'S' && this.funcaoComErro) {
      this.poNotification.warning('A função JS possui erros. Verifique');
      return;
    }

    delete this.currentVar.acoes;
    this.variaveisService.update(this.currentVar).subscribe(res => {
      this.poNotification.success('Alteração realizada com sucesso');
      this.poModal.close();
      this.getData();
    }, err => {
      if (err.status !== 400) {
        this.poNotification.error(err.error);
      }
    });

  }

  testJs() {
    if (this.funcaoJs === 'S') {

      try {
        // tslint:disable-next-line: no-eval
        const fn = eval(`(${this.currentVar.valor})`);
        this.log = `
          ${fn(this.param)}
        `;
        this.funcaoComErro = false;
      } catch (err) {
        this.log = err;
        this.funcaoComErro = true;
      }
    }
  }

  getData() {
    this.variaveisService.findAll().subscribe(res => this.items = res.map(p => {
      // p.valor = this.variaveisService.isJsFunction(p.valor) ? 'JSFN' : p.valor;
      return { ...p, acoes: ['editar'] };
    })
    );
  }


}
