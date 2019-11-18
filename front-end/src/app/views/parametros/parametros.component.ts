import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoTableColumn, PoModalAction, PoModalComponent, PoNotificationService } from '@portinari/portinari-ui';
import { ParametrosService } from 'src/app/services/parametros.service';
import { Parametro } from 'src/app/models/parametros.model';
import { PrefixService } from 'src/app/services/prefix.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    private parametroService: ParametrosService,
    public poNotificatinService: PoNotificationService,
    private prefixService: PrefixService) { }

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Parametros' },
    ]
  };
  columns: PoTableColumn[] = [
    {
      property: 'acoes', label: 'Ações', type: 'icon', icons: [
        { icon: 'po-icon-edit', action: this.editParam.bind(this), value: 'editar' }
      ]
    },
    { property: 'nome', label: 'Nome' },
    { property: 'valor', label: 'Valor' },
    { property: 'descricao', label: 'Descrição' }
  ];
  items = [];
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
  currentParam: Parametro;

  ngOnInit() {
    this.getParmeters();
  }

  getParmeters() {
    this.parametroService.getAll().subscribe(res => {
      this.items = res.map(p => {
        return { ...p, acoes: ['editar'] };
      });
    });
  }

  editParam(value) {
    this.currentParam = value;
    this.poModal.open();
  }

  closeModal() {
    this.poModal.close();
  }
  saveParam() {
    const obj: any = {
      ...this.currentParam
    };
    delete obj.acoes;
    this.parametroService.update(obj).subscribe(res => {
      this.poNotificatinService.success('Parametro Alterado com sucesso');
      this.closeModal();
      this.getParmeters();
      if (obj.nome === 'IDENTVARIAVELDOC') {
        this.prefixService.setPrefix(obj.valor);
      }
    }, err => {
      this.poNotificatinService.error(err);
    });
  }

}
