import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-inativo',
  templateUrl: './agent-inativo.component.html',
  styleUrls: ['./agent-inativo.component.css']
})
export class AgentInativoComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() status = 'INATIVO';
  @Input() description = 'Ative o agente para realizar essa configuração';
  urlDownload = 'https://drive.google.com/open?id=1crCrdet828EDUNcHXETN4m31SqFJGhAP';
  ngOnInit() {
  }

  goToConfig() {
    this.router.navigateByUrl('/sistema/agent-config');
  }


  downloadAgent() {
    const win = window.open(this.urlDownload, '_blank');
    win.focus();
  }

  abrirAgent() {
    window.location.href = 'mycustproto:dealer ';
  }

}
