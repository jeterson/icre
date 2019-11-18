import { Component, OnInit, ViewChild } from '@angular/core';
import { BackupService } from 'src/app/services/backup.service';
import { PoModalAction, PoModalComponent, PoNotificationService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-backup-manager',
  templateUrl: './backup-manager.component.html',
  styleUrls: ['./backup-manager.component.css']
})
export class BackupManagerComponent implements OnInit {

  constructor(private backupService: BackupService, private poNotification: PoNotificationService) { }

  @ViewChild('detailsModalLastBackup', { static: true }) detailsModalLastBackup: PoModalComponent;

  lastBackup;
  periodicidades = [
    { value: 'DIARIO', label: 'Diário' },
    //  { value: 'SEMANAL', label: 'Semanal' }
  ];
  periodicidade = 'DIARIO';
  backupAutomatico = false;
  horario = '17:30';
  diaSemana = new Date().getDay();
  dirBackup;
  recorrenciaSemanal = [
    { label: 'Domingo', value: 0 },
    { label: 'Segunda Feira', value: 1 },
    { label: 'Terça Feira', value: 2 },
    { label: 'Quarta Feira', value: 3 },
    { label: 'Quinta Feira', value: 4 },
    { label: 'Sexta Feira', value: 5 },
    { label: 'Sábado', value: 6 },
  ];

  ngOnInit() {
    this.backupService.getLast().subscribe((res: any) => {
      this.lastBackup = res;
      // this.lastBackup.data = new Date(res.data);
    });

    this.backupService.getConfig().subscribe((res: any) => {
      this.diaSemana = res.diasemana;
      this.backupAutomatico = res.automatico;
      this.horario = res.horario;
      this.periodicidade = res.periodicidade;
    }, err => {
      if (err.status !== 400) {
        this.poNotification.error(err);
      }
    });

    this.backupService.getDirBackup().subscribe(res => this.dirBackup = res);
  }

  get dataLastBackupFormat() {
    if (this.lastBackup) {
      const data = new Date(this.lastBackup.data);
      const strDay = this.getDayOfWeekStr(data.getDay());
      return `${strDay} - ${data.getDate()}/${data.getMonth() + 1}/
            ${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    }
  }

  getDayOfWeekStr(date: Date | number) {
    const day = typeof (date) === 'object' ? date.getDay : date;
    switch (day) {
      case 0:
        return 'Domingo';
      case 1:
        return 'SegundaFeira';
      case 2:
        return 'TerçaFeira';
      case 3:
        return 'QuartaFeira';
      case 4:
        return 'QuintaFeira';
      case 5:
        return 'SextaFeira';
      case 6:
        return 'Sabado';
      default:
        return 'Domingo';
    }
  }
  get backupToday() {
    if (this.lastBackup && this.lastBackup.status !== 'FALHA') {
      const today = new Date();
      const backupDate = new Date(this.lastBackup.data);
      const todayFormat = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const backupDateFormat = `${backupDate.getDate()}-${backupDate.getMonth() + 1}-${backupDate.getFullYear()}`;
      const runToday = backupDateFormat === todayFormat;
      return runToday;
    }
  }

  openModal(type: string) {
    switch (type) {
      case 'detailhesSucesso':
        this.detailsModalLastBackup.open();
        break;
      default:
        return;
    }
  }

  executeBackup() {
    this.backupService.executeBackup().subscribe(res => {
      this.poNotification.success('Backup executado com sucesso');
      this.ngOnInit();
    }, err => {
      if (err.status !== 400) {
        this.poNotification.error(err);
      }
      this.ngOnInit();
    });
  }

  salvarConfig() {
    const obj = {
      automatico: this.backupAutomatico,
      periodicidade: this.periodicidade,
      horario: this.horario,
      diasemana: this.diaSemana
    };
    this.backupService.alterConfig(obj).subscribe(res => {
      this.poNotification.success('Alterações salvas');
    }, err => {
      if (err.status !== 400) {
        this.poNotification.error(err);
      }
    });
  }

  getHorario() {
    const h: string = this.horario;
    return h.slice(0, 2) + ':' + h.slice(2 + Math.abs(0));
  }

}
