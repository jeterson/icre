import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private agentService: AgentService) { }

  status;
  ngOnInit() {
    this.agentService.test().subscribe(res => this.status = res);
  }

}
