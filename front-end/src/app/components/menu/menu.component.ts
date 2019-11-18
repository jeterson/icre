import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItemSelected: string;


  menus: Array<PoMenuItem> = [

    {
      label: 'Cadastros', icon: 'po-icon-share', shortLabel: 'Links', subItems: [
        { label: 'Cliente', action: this.printMenuAction, link: '/cadastros/cliente-list' },
        { label: 'Banco', action: this.printMenuAction, link: '/cadastros/banco-list' },
        { label: 'Variáveis Word', action: this.printMenuAction, link: '/cadastros/variaveis' }
      ]
    },
    {
      label: 'Sistema', shortLabel: 'Sys', subItems: [
        { label: 'Parametros', link: '/sistema/parametros' },
        { label: 'Agente', link: '/sistema/agent-config' },
        { label: 'Impressora', link: '/sistema/printer-config' },
        { label: 'Modelos', link: '/sistema/models-config' },
        { label: 'Backup', link: '/sistema/backup-manager' },
        { label: 'Api', link: '/sistema/api-config' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }


  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }


}
