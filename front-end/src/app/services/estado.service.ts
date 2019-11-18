import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  resource = 'estados';
  constructor(public http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>(this.resource);
  }
}
