import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parametro } from '../models/parametros.model';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  resource = 'parametros';
  constructor(private http: HttpClient) {
    this.getOne('CAPITALIZE').subscribe(res => {
      localStorage.setItem('icre.params.capitalize', res.valor);
    });
  }

  getAll(descricao: string = '') {
    return this.http.get<Parametro[]>(`${this.resource}?search=${descricao}`);
  }

  getOne(name: string) {
    return this.http.get<Parametro>(`${this.resource}/${name}`);
  }
  update(param: Parametro) {
    return this.http.put(this.resource, param);
  }
}
