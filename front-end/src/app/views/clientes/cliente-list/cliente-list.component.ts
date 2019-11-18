import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoPageFilter,
  PoBreadcrumb,
  PoPageAction,
  PoModalAction,
  PoModalComponent,
  PoTableColumn,
  PoDialogService,
  PoNotificationService
} from '@portinari/portinari-ui';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { PrefixService } from 'src/app/services/prefix.service';
import { VariaveisService } from 'src/app/services/variaveis.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  public readonly filterSettings: PoPageFilter = {
    action: 'filterAction',
    ngModel: 'labelFilter',
    advancedAction: 'advancedFilterActionModal',
    placeholder: 'Pesquisar pelo Nome'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Clientes' },
    ]
  };
  labelFilter = '';
  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', url: '/cadastros/cliente-cadastro' },
    { label: 'Editar', action: this.goToEdit.bind(this), disabled: this.disabledButton.bind(this) },
    { label: 'Excluir', action: this.delete.bind(this), disabled: this.disabledButton.bind(this) },
    { label: 'Imprimir', action: this.printDocModal.bind(this), disabled: this.disabledButton.bind(this) },
  ];
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: PoModalComponent;
  @ViewChild('printModal', { static: true }) printModal: PoModalComponent;


  public readonly advancedFilterPrimaryAction: PoModalAction = {
    action: () => {
      this.filterAction();
      this.advancedFilterModal.close();

    },
    label: 'Aplicar Filtros'
  };

  columns: PoTableColumn[] = [
    {
      property: 'acoes', type: 'icon', icons: [
        { icon: 'po-icon-eye', value: 'ver', action: this.detalheCliente.bind(this), tooltip: 'Detalhes' },
        { icon: 'po-icon-document-filled', value: 'print', action: this.printDocModal.bind(this) }
      ], width: '80px'
    },
    { property: 'id', label: 'Código', type: 'string', width: '80px' },
    { property: 'nome', label: 'Nome', width: '200px' },
    { property: 'unidade_consumidora', label: 'UC', width: '150px' },
    { property: 'rg', label: 'RG', width: '80px'  },
    { property: 'cpf', label: 'CPF' },
    {
      property: 'estado_civil', label: 'Est. Civil', type: 'label', labels: [
        { value: 'S', label: 'Solteiro(a)', color: 'color-02' },
        { value: 'C', label: 'Casado(a)', color: 'color-08' },
        { value: 'D', label: 'Divorciado(a)', color: 'color-07' },
        { value: 'V', label: 'Viuvo(a)', color: 'color-11' }
      ]
    },
    {
      property: 'sexo', label: 'Sexo', type: 'subtitle', subtitles: [
        { value: 'M', label: 'Masculino', content: 'M', color: 'color-11' },
        { value: 'F', label: 'Feminino', content: 'F', color: 'color-08' },
        { value: 'N', label: 'N/D', content: 'N', color: 'color-07' },
      ]
    },
    { property: 'descricao', label: 'Banco', width: '180px' },
    { property: 'telefone', label: 'Telefone', width: '180px' },
    { property: 'celular', label: 'Celular', width: '180px' },
    { property: 'endereco', label: 'Endereço', width: '180px'},
    { property: 'bairro', label: 'Bairro',  },
    { property: 'numero', label: 'Número', width: '90px' },
    { property: 'cep', label: 'CEP', width: '120px' },
    { property: 'cidade', label: 'Cidade', width: '180px' },
    { property: 'estado', label: 'UF', width: '80px' },
  ];
  items = [];
  currentClientDetail: Cliente;
  loading = false;
  agentAtivo = false;
  printAction: PoModalAction = {
    label: 'Imprimir',
    action: this.printDoc.bind(this),
    // disabled: this.isPrintDisabled
  };
  secondPrintAction: PoModalAction = {
    label: 'Validar Agente/Cancelar',
    action: this.cancelValidAgentAction.bind(this)
  };
  dataToPrinter: any = { model: {} };
  keyPrefix;
  currentCli;
  searcForm = {
    uc: '',
    nome: '',
    rg: '',
    cpf: '',
    uf: 'ZZ',
    cidade: '',
    id: ''
  };
  ufs = [{ value: 'ZZ', label: 'Todos' }];

  constructor(
    public clienteService: ClienteService,
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private agentService: AgentService,
    private prefixService: PrefixService,
    private variavelService: VariaveisService,
    private estadoService: EstadoService) { }

  ngOnInit() {
    this.items = this.clienteService.clientesState;
    this.agentService.test().subscribe(res => this.agentAtivo = res);
    this.prefixService.getPrefix().subscribe(res => this.keyPrefix = res);
    this.estadoService.getEstados().subscribe(res => {
      this.ufs = this.ufs.concat(res.map(e => {
        return { label: e.uf, value: e.uf };
      }));

    });

  }

  delete() {
    const value = this.getSelectedValue();
    this.poDialogService.confirm({
      title: 'Confirmação do usuário',
      message: 'Deseja realmente excluir esse cliente ? ' + value.nome,
      confirm: () => {
        this.clienteService.delete(value.id).subscribe(res => {
          this.poNotificationService.success('Cliente excluido com sucesso');
          this.filterAction();
        }, err => {
          if (err.status !== 400) {
            this.poNotificationService.error(err.error.message);
          }
        });
      }
    });
  }

  get tableContainerStyle() {
    let width = screen.width;
    width = width + (width * 20 / 100);
    return { width: width + 'px' };
  }

  getSelectedValue() {
    return this.items.find(cliente => cliente['$selected']);
  }

  disabledButton() {
    return !this.getSelectedValue();
  }

  get isPrintDisabled() {
    return !this.agentAtivo;
  }

  detalheCliente(value: Cliente) {
    this.router.navigate(['/cadastros/cliente-detalhes', value.id]);
  }


  filterAction() {
    this.loading = true;

    // tratar uns bugs
    const search = {...this.searcForm};
    search.uc = search.uc || '';
    search.uf = search.uf === 'ZZ' ? '' : search.uf;
    search.nome = this.labelFilter || search.nome;

    this.clienteService.findAll(search).subscribe(res => {
      this.items = res.map(cliente => {
        return { ...cliente, acoes: ['ver', 'print'] };
      });
      this.clienteService.clientesState = this.items;
      this.loading = false;
    }, err => this.loading = false);
  }

  advancedFilterActionModal() {
    this.advancedFilterModal.open();
  }

  goToEdit() {
    const value = this.getSelectedValue();
    this.router.navigate(['/cadastros/cliente-edit', value.id]);
  }

  printDocModal(value: any) {
    this.currentCli = value;
    this.printModal.open();
  }

  cancelValidAgentAction() {
    if (!this.agentAtivo) {
      this.agentService.test().subscribe(res => this.agentAtivo = res);
    } else {
      this.printModal.close();
    }
  }



  printDoc(cliente: any = null) {

    if (!cliente) {
      cliente = this.getSelectedValue();
    }
    if (!cliente) {
      cliente = this.currentCli;
    }

    console.log(cliente);

    // Para o processo se nao selecionar um modelo
    if (!this.dataToPrinter.model) {
      this.poNotificationService.warning('Selecione um modelo para continuar');
      return;
    }


    this.agentService.test().subscribe(res => {
      this.agentAtivo = res;
      const { BasePath, FileName } = this.dataToPrinter.model;
      if (this.agentAtivo) {

        this.variavelService.getReplaces(cliente).subscribe(data => {
          const payload = {
            inputFileName: FileName,
            basePath: BasePath,
            basePathReplaced: 'replaced',
            printerName: this.dataToPrinter.printer,
            keyPrefix: this.keyPrefix,
            replaces: data
          };
          this.loading = true;
          this.agentService.print(payload).subscribe(res1 => {
            this.poNotificationService.success('Solicitação de Impressão enviado a impressora.');
            this.loading = false;
          }, err => {
            this.poNotificationService.error(err.error);
            this.loading = false;
          }); // end print
        }, err => {
          if (err.status !== 400) {
            this.poNotificationService.error(err.error);
          }
        }); // end replaces

      }

    }); // end agent test
  }

}
