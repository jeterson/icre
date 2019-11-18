import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { PoBreadcrumb } from '@portinari/portinari-ui';
import { PoPageDynamicDetailActions, PoPageDynamicDetailField } from '@portinari/portinari-templates';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {

  constructor(public clienteService: ClienteService, private route: ActivatedRoute) { }

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Clientes', link: '/cadastros/cliente-list' },
      { label: 'Detalhes' },
    ]
  };
  actions: PoPageDynamicDetailActions = {
    back: '/cadastros/cliente-list',
    remove: 'cadastros/cliente-list/:id',
    edit: 'cadastros/cliente-edit/:id'
  };
  fields: PoPageDynamicDetailField[] = [
    { label: 'Código', property: 'id', divider: 'Dados Pessoais', gridColumns: 1, key: true },
    { label: 'Nome', property: 'nome', gridColumns: 4 },
    { label: 'RG', property: 'rg', gridColumns: 2 },
    { label: 'CPF', property: 'cpf', gridColumns: 2 },
    { label: 'Unidade Consum.', property: 'unidade_consumidora', gridColumns: 2, tag: true },
    { label: 'Telefone', property: 'telefone', gridColumns: 2 },
    { label: 'Celular', property: 'celular', gridColumns: 2, },
    { label: 'Sexo', property: 'sexoDesc', gridColumns: 2, },
    { label: 'Est. Civil', property: 'estadoCivilDesc', gridColumns: 2, },
    { label: 'Orgão Ex.', property: 'orgao_expedidor', gridColumns: 1, },

    { label: 'Endereço', property: 'endereco', gridColumns: 3, divider: 'Endereço' },
    { label: 'Bairro', property: 'bairro', gridColumns: 2 },
    { label: 'Número', property: 'numero', gridColumns: 1 },
    { label: 'Cidade', property: 'cidade', gridColumns: 2, },
    { label: 'Cep', property: 'cep', gridColumns: 2, },
    { label: 'Estado', property: 'estado', gridColumns: 1, },
    { label: 'Banco', property: 'bancoDesc', gridColumns: 2, divider: 'Dados Financeiros' },
    { label: 'Agencia', property: 'agencia', gridColumns: 1 },
    { label: 'Cc', property: 'conta_corrente', gridColumns: 1 },
    { label: 'Unidade Consum.', property: 'unidade_consumidora', divider: 'Dados da Rede', gridColumns: 2 },
    { label: 'Ano Concl.', property: 'ano_conclusao', gridColumns: 1 },
    { label: 'Rede pago a vista', property: 'rede_pago_avistaDesc', gridColumns: 2, tag: true },
    { label: 'Financ. Luz Campo', property: 'rede_financ_proj_luz_campoDesc', gridColumns: 2, tag: true },
    { label: 'Poste Concreto', property: 'poste_concretoDesc', gridColumns: 2, tag: true },
    { label: 'Doação rede Ceron', property: 'doacao_rede_ceronDesc', gridColumns: 2, tag: true },
    { label: 'Recibos', property: 'recibosDesc', gridColumns: 2, tag: true },
    { label: 'Notas Fiscais', property: 'notas_fiscaisDesc', gridColumns: 2, tag: true },
    { label: 'Juntar cópia Proj. Rede', property: 'juntar_copia_projeto_redeDesc', gridColumns: 2, tag: true },
    { label: 'Custo Rede', property: 'remunerar', gridColumns: 2 },
  ];
  cliente: any;

  ngOnInit() {


  }


}
