import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { PoNotificationService, PoPageAction, PoBreadcrumb } from '@portinari/portinari-ui';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-printer-config',
  templateUrl: './printer-config.component.html',
  styleUrls: ['./printer-config.component.css']
})
export class PrinterConfigComponent implements OnInit {

  constructor(private agentService: AgentService, private router: Router, private poNotificationService: PoNotificationService) { }
  agentAtivo = false;
  printers = [];
  defaultPrinter: string;
  actions: PoPageAction[] = [
    { label: 'Cancelar', url: '/' },
    { label: 'Salvar', action: this.savePrinter }
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Configurar Impressora', }
    ]
  };
  ngOnInit() {

    this.agentService.test().subscribe(res => {
      this.agentAtivo = res;

      if (this.agentAtivo) {
        this.agentService.getPrinters().subscribe(res1 => {
          this.printers = res1.map(m => {
            return { value: m.Name, label: m.Name };
          });

          const printer = res1.find(p => p.Default);
          this.defaultPrinter = printer.Name;

          if (!this.agentService.getPrinterName()) {
            this.agentService.savePrinter(this.defaultPrinter);
          }
        }, err => {
          this.poNotificationService.error(err);
        });
      }
    });



  }

  isAgentAtivo() {
    return this.agentAtivo;
  }


  goToConfig() {
    this.router.navigateByUrl('/sistema/agent-config');
  }

  savePrinter() {
    if (!this.agentAtivo) {
      this.poNotificationService.warning('Ative o agente para salvar a imporessora padrão');
      return;
    }
    this.agentService.savePrinter(this.defaultPrinter);
    this.poNotificationService.success('Impressora Padrão Salva');
  }

}
