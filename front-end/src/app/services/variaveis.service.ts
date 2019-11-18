import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FunctionCall } from '@angular/compiler';
import { Observable } from 'rxjs';


const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();


@Injectable({
  providedIn: 'root'
})
export class VariaveisService {

  constructor(private http: HttpClient) { }
  resource = 'variaveis';

  findAll() {
    return this.http.get<any[]>(this.resource);
  }

  capitalize(str: any) {

    str = str + '';
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');

  }

  formataCampo(campo, Mascara, evento) {
    let boleanoMascara;

    const Digitato = evento.keyCode;
    const exp = /\-|\.|\/|\(|\)| /g;
    const campoSoNumeros = campo.value.toString().replace(exp, "");

    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;

    if (Digitato !== 8) {
      for (let i = 0; i <= TamanhoMascara; i++) {
        boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.')
          || (Mascara.charAt(i) === '/'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')')
          || (Mascara.charAt(i) === ' '));
        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
      campo.value = NovoValorCampo;
      return true;
    } else {
      return true;
    }
  }

  isJsFunction(value) {
    try {
      // tslint:disable-next-line: no-eval
      const fn = eval(`(${value})`);
      const str = typeof fn;
      return str === 'function';
    } catch (ex) {
      return false;
    }
  }

  update(obj) {
    return this.http.put(this.resource, obj);
  }

  getJsFunction(fnStr): any {
    // tslint:disable-next-line: no-eval
    const fn = eval(`(${fnStr})`);
    return fn;
  }

  getReplaces(cliente: any) {
    const cap = localStorage.getItem('icre.params.capitalize');
    cliente.capitalize = cap;
    cliente.capitalizeFn = this.capitalize;
    cliente.formatFn = this.formataCampo;
    const observer = new Observable(o => {
      this.findAll().subscribe(vars => {

        const replaces = [];
        for (const v of vars) {
          if (this.isJsFunction(v.valor)) {
            const fn = this.getJsFunction(v.valor);
            const val = fn(cliente[v.propriedade], cliente);
            replaces.push({
              key: v.chave,
              value: val
            });
          } else {
            replaces.push({
              key: v.chave,
              value: cliente[v.valor]
            });
          }

        }
        o.next(replaces);

      }, err => o.error(err)); // end findAll

    }); // end observer

    return observer;


  }
}
