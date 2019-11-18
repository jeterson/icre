import { Injectable } from '@angular/core';
import { PoTableColumn } from '@portinari/portinari-ui';
import { Banco } from '../models/banco.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BancoService {

  constructor(private http: HttpClient) { }

  private itemsSubject: BehaviorSubject<Banco[]> = new BehaviorSubject<Banco[]>([]);
  items: Banco[] = [];
  resource = 'bancos';

  getColumns() {
    const columns: Array<PoTableColumn> = [
      { property: 'id', label: 'Id', type: 'number' },
      { property: 'descricao', label: 'Descrição', type: 'string' }
    ];

    return columns;
  }

  save(obj: Banco) {
    if (obj.id) {
      return this.update(obj);
    } else {
      return this.insert(obj);
    }
  }

  private update(obj: Banco): Observable<any> {
    return this.http.put(this.resource, obj);
  }

  private insert(obj: Banco): Observable<any> {
    delete obj.id;
    return this.http.post(this.resource, obj);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resource}/${id}`);
  }

  getItem(id: number): Observable<Banco> {
    return this.http.get<Banco>(`${this.resource}/${id}`);
  }

  getItems(query: string = ''): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${this.resource}?descricao=${query}`);

  }
}
