import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { PoComboFilter, PoComboOption } from '@portinari/portinari-ui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements PoComboFilter {

  // private headers = { 'X-Portinari-No-Error': 'true' };
  resource = 'clientes';
  clientesState = [];
  constructor(private http: HttpClient) { }

  insert(cliente: Cliente) {
    return this.http.post(this.resource, cliente);
  }

  update(cliente: Cliente) {
    return this.http.put(this.resource, cliente);
  }

  save(cliente: Cliente) {
    if (cliente.id) {
      return this.update(cliente);
    } else {
      return this.insert(cliente);
    }
  }

  findAll(searchForm) {
    return this.http.get<Cliente[]>(this.resource, { params: searchForm });
  }

  delete(id: number) {
    return this.http.delete(`${this.resource}/${id}`);
  }

  findOne(id: number) {
    return this.http.get(`${this.resource}/${id}`);
  }

  getFilteredData(params: any, filterParams?: any): Observable<PoComboOption[]> {
    return this.http.get<PoComboOption[]>(`${this.resource}/uc/${params.value || 'XX'}`);

  }
  getObjectByValue(value: string | number, filterParams?: any): Observable<PoComboOption> {
    return this.http.get<PoComboOption>(this.resource);
  }
}
