import { Component, OnInit } from '@angular/core';
import { PoPageAction, PoNotificationService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  baseUrlKey = 'icre.api.baseUrl';
  portKey = 'icre.api.port';
  api = 'localhost';
  port = 3000;
  constructor(private poNotification: PoNotificationService) { }
  actions: PoPageAction[] = [
    { label: 'Cancelar', url: '/', type: 'default' },
    { label: 'Salvar', action: this.save, type: 'danger' },

  ];
  ngOnInit() {
    this.api = localStorage.getItem(this.baseUrlKey) || 'localhost';
    const p = localStorage.getItem(this.portKey) || 3000;
    this.port = (p as unknown) as number;
  }

  save() {
    localStorage.setItem(this.baseUrlKey, this.api);
    localStorage.setItem(this.portKey, this.port.toString());
    this.poNotification.success('Alterado com sucesso');
  }

}
