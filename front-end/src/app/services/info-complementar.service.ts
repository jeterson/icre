import { Injectable } from '@angular/core';
import { PoCheckboxGroupOption } from '@portinari/portinari-ui';

@Injectable({
  providedIn: 'root'
})
export class InfoComplementarService {

  constructor() { }

  getOptions() {
    const opts: PoCheckboxGroupOption[] = [
      { label: 'Juntar cópia do projeto na rede', value: 'juntarCopiaProjetoRede' },
      { label: 'Notas Fiscais', value: 'notasFiscais' },
      { label: 'Recibos', value: 'recibos' },
      { label: 'Doação da rede para ceron', value: 'doacaoRedeCeron' },
      { label: 'Rede pago a vista', value: 'redePagoVista' },
      { label: 'Rede financiada pelo projeto Luz do Campo', value: 'redeFinanciadaProjetoLuzCampo' },
      { label: 'Os Postes são de concreto', value: 'postesConcreto' },


    ];

    return opts;
  }
}
