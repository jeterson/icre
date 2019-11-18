import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { PoNotificationService, PoModalAction } from '@portinari/portinari-ui';



@Component({
  selector: 'app-impressao-dialog',
  templateUrl: './impressao-dialog.component.html',
  styleUrls: ['./impressao-dialog.component.css']
})
export class ImpressaoDialogComponent implements OnInit {

  constructor(private agentService: AgentService, private poNotification: PoNotificationService) { }

  models = [];
  model: string;
  printer: string;
  printers = [];
  docs = [];
  config: object;
  @Output() data: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
    this.printer = this.agentService.getPrinterName();
    this.refreshModels();

    this.agentService.getPrinters().subscribe(res => {
      this.printers = res.map(m => {
        return { value: m.Name, label: m.Name };
      });
    }, err => {
      this.poNotification.error(err.error);
    });
  }

  refreshModels() {
    const dir = this.agentService.getDocModelsDir();
    this.agentService.getDocModels(dir).subscribe(res => {
      this.docs = res;
      this.models = res.map(m => {
        return { value: m.Path, label: m.FileName };
      });
    }, err => {
      this.poNotification.error(err.error);
    });

  }

  changeValue(e: any) {
    const file = this.docs.find(f => f.Path === this.model);
    const obj = { model: file, printer: this.printer };
    this.data.emit(obj);
  }


}
