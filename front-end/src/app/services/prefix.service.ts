import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParametrosService } from './parametros.service';
import { map } from 'rxjs/operators';
import { Parametro } from '../models/parametros.model';
import { PoNotificationService } from '@portinari/portinari-ui';

@Injectable({ providedIn: 'root' })
export class PrefixService {
  private prefixSubject = new BehaviorSubject<string>(null);

  constructor(private parametroService: ParametrosService, private poNotification: PoNotificationService) {
    this.getParamVariavel().subscribe(res => {
      this.setPrefix(res.valor);
    }, err => {
      console.error('Erro ao buscar parametro');
      this.poNotification.error(err);
    });

  }
  getPrefix() {
    return this.prefixSubject.asObservable();

  }

  setPrefix(prefix: string) {
    this.prefixSubject.next(prefix);
  }

  private getParamVariavel() {
    return this.parametroService.getOne('IDENTVARIAVELDOC');
  }
}
