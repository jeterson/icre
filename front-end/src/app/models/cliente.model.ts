import { Banco } from './banco.model';

export interface Cliente {
  id?: number;
  nome: string;
  unidadeConsumidora: string;
  sexo: string;
  estadoCivil: string;
  banco: number;
  agencia: string;
  contaCorrente: string;
  telefone: string;
  celular: string;
  estado: string;
  endereco: string;
  bairro: string;
  numero: number;
  cidade: string;
  cep: string;
  redePagoAvista: string;
  redeFinancProjLuzCampo: string;
  posteConcreto: string;
  anoConclusao: string;
  doacaoRedeCeron: string;
  recibos: string;
  notas_fiscais: string;
  juntar_copia_projeto_rede: string;
  dataCadastro: Date;
  dataAlteracao: Date;
  dataExclusao: Date;
  obs: string;
  nomeUsuario: string;
  orgaoExpedidor: string;
  outroDocumendo: string;
  remunerar: number;
  rg: string;
  cpf: string;


}
