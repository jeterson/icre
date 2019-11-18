import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoRadioGroupOption, PoSelectOption, PoPageEditLiterals, PoNotificationService } from '@portinari/portinari-ui';
import { PrefixService } from 'src/app/services/prefix.service';
import { EstadoCivilService } from 'src/app/services/estado-civil.service';
import { InfoComplementarService } from 'src/app/services/info-complementar.service';
import { BancoService } from 'src/app/services/banco.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  constructor(
    public prefixService: PrefixService,
    private estadoCivilService: EstadoCivilService,
    private poNotificationService: PoNotificationService,
    public infoComplementarService: InfoComplementarService,
    private bancoService: BancoService,
    private estadoService: EstadoService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  edit = false;
  sexo = 'M';
  clienteForm: FormGroup;
  readonly sexoOptions: Array<PoRadioGroupOption> = [
    { label: 'Masculimo', value: 'M' },
    { label: 'Feminimo', value: 'F' },
    { label: 'Não Informar', value: 'N' }
  ];

  estadoCivilOptions = this.estadoCivilService.getAll();
  bancos = [];
  estados = [];


  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Clientes', link: '/cadastros/cliente-list' },
      // { label: 'Novo' }
    ]
  };

  ngOnInit() {

    this.bancoService.getItems().subscribe(res => {
      this.bancos = res.map(b => {
        return { value: b.id, label: b.descricao };
      });
    });

    this.estadoService.getEstados().subscribe(res => {
      return this.estados = res.map(e => {
        return { value: e.uf, label: `${e.uf} - ${e.estado}` };
      });
    });

    this.createFormCliente();
    this.route.params.subscribe(res => {
      if (res.id) {
        this.breadcrumb.items.push({ label: 'Editar' });
        this.getCliente(res.id);
      } else {
        this.breadcrumb.items.push({ label: 'Novo' });
      }
    });

  }

  getCliente(id: number) {
    this.clienteService.findOne(id).subscribe(res => {
      this.transformClienteToForm(res);
    });
  }

  private transformClienteToForm(cliente: any) {
    this.clienteForm.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      unidadeConsumidora: cliente.unidade_consumidora,
      rg: cliente.rg,
      cpf: cliente.cpf,
      orgaoExpedidor: cliente.orgao_expedidor,
      telefone: cliente.telefone,
      celular: cliente.celular,
      sexo: cliente.sexo,
      estadoCivil: cliente.estado_civil,
      outroDocumento: cliente.outro_documento,
      remunerar: cliente.remunerar,
      banco: cliente.banco.id,
      agencia: cliente.agencia,
      contaCorrente: cliente.conta_corrente,
      obs: cliente.obs,
      endereco: cliente.endereco,
      bairro: cliente.bairro,
      numero: cliente.numero,
      cep: cliente.cep,
      cidade: cliente.cidade,
      estado: cliente.estado,
      anoConclusao: cliente.ano_conclusao,
      infoComplementar: this.getInfoComplementar(cliente),

    });
  }

  createFormCliente() {
    this.clienteForm = this.formBuilder.group({
      id: [null],
      nome: [null],
      unidadeConsumidora: [null],
      rg: [null],
      orgaoExpedidor: [null],
      cpf: [null],
      telefone: [null],
      celular: [null],
      sexo: [null],
      estadoCivil: [null],
      outroDocumento: [null],
      banco: [null],
      agencia: [null],
      contaCorrente: [null],
      obs: [null],
      endereco: [null],
      bairro: [null],
      numero: [null],
      cep: [null],
      cidade: [null],
      estado: [null],
      anoConclusao: [null],
      infoComplementar: [[]],
      dataCadastro: [null],
      dataExclusao: [null],
      dataAlteracao: [null],
      remunerar: [0]




    });
  }



  cancel() {
    this.router.navigateByUrl('/cadastros/cliente-list');
  }
  save() {
    this.insert(true);
  }

  insert(redirect: boolean = false) {
    const formValue = this.clienteForm.value;
    const cliente: Cliente = { ...formValue };
    cliente.juntar_copia_projeto_rede = this.existsValueIn<string>(formValue.infoComplementar, 'juntarCopiaProjetoRede') ? 'S' : 'N';
    cliente.doacaoRedeCeron = this.existsValueIn<string>(formValue.infoComplementar, 'doacaoRedeCeron') ? 'S' : 'N';
    cliente.notas_fiscais = this.existsValueIn<string>(formValue.infoComplementar, 'notasFiscais') ? 'S' : 'N';
    cliente.posteConcreto = this.existsValueIn<string>(formValue.infoComplementar, 'postesConcreto') ? 'S' : 'N';
    cliente.redePagoAvista = this.existsValueIn<string>(formValue.infoComplementar, 'redePagoVista') ? 'S' : 'N';
    cliente.recibos = this.existsValueIn<string>(formValue.infoComplementar, 'recibos') ? 'S' : 'N';
    cliente.redeFinancProjLuzCampo = this.existsValueIn<string>(formValue.infoComplementar, 'redeFinanciadaProjetoLuzCampo') ? 'S' : 'N';
    delete (cliente as any).infoComplementar;

    this.clienteService.save(cliente).subscribe(res => {
      this.poNotificationService.success('Operação realizada com sucesso');
      this.clienteForm.reset();
      if (redirect) {
        this.router.navigateByUrl('/cadastros/cliente-list');
      } else {
        this.router.navigateByUrl('/cadastros/cliente-cadastro');
      }
    }, err => {
      if (err.status !== 400) {
        console.log(err);
        this.poNotificationService.error(err.error.mesage);
      }
    });
  }

  existsValueIn<T>(data: Array<T>, value: T) {
    const str = data.find(f => f === value);
    if (str) {
      return true;
    } else {
      return false;
    }

  }
  getInfoComplementar(cliente: any) {
    const infoComplementar = [];
    if (cliente.juntar_copia_projeto_rede === 'S') {
      infoComplementar.push('juntarCopiaProjetoRede');
    }
    if (cliente.notas_fiscais === 'S') {
      infoComplementar.push('notasFiscais');
    }
    if (cliente.rede_pago_avista === 'S') {
      infoComplementar.push('redePagoVista');
    }
    if (cliente.rede_financ_proj_luz_campo === 'S') {
      infoComplementar.push('redeFinanciadaProjetoLuzCampo');
    }
    if (cliente.poste_concreto === 'S') {
      infoComplementar.push('postesConcreto');
    }
    if (cliente.doacao_rede_ceron === 'S') {
      infoComplementar.push('doacaoRedeCeron');
    }
    if (cliente.recibos === 'S') {
      infoComplementar.push('recibos');
    }


    return infoComplementar;
  }

  saveNew() {
    this.insert();
  }

}
