import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoPageFilter, PoPageAction, PoModalComponent, PoDialogService, PoBreadcrumb, PoNotificationService } from '@portinari/portinari-ui';
import { BancoService } from 'src/app/services/banco.service';
import { Router } from '@angular/router';
import { Banco } from 'src/app/models/banco.model';

@Component({
  selector: 'app-banco-list',
  templateUrl: './banco-list.component.html',
  styleUrls: ['./banco-list.component.css']
})
export class BancoListComponent implements OnInit {


  labelFilter = '';
  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', url: '/cadastros/banco-cadastro' },
    { label: 'Editar', action: this.editar.bind(this), disabled: this.isSelected.bind(this) },
    { label: 'Excluir', action: this.delete.bind(this), disabled: this.isSelected.bind(this) },
  ];

  public readonly columns: Array<PoTableColumn> = this.bancoService.getColumns();

  public items = [];

  public readonly filterSettings: PoPageFilter = {
    action: 'filterAction',
    ngModel: 'labelFilter',
    placeholder: 'Pesquisar'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Banco' },
    ]
  };

  constructor(
    private router: Router,
    public bancoService: BancoService,
    private poAlert: PoDialogService,
    private poNotificationService: PoNotificationService) { }

  ngOnInit(): void {
    this.bancoService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  isSelected() {
    const selected = this.items.find(item => item['$selected']);
    return !selected;

  }

  delete() {
    const selected = this.items.find(item => item['$selected']);
    this.poAlert.confirm({
      title: 'Confirmação', message: 'Deseja Excluir esse registro ?', confirm: () => {
        this.bancoService.delete(selected.id).subscribe(res => {
          this.poNotificationService.success('Registro excluido com sucesso');
          this.filter();
        }, err => {
          this.poNotificationService.error(err.message);
        });
      }
    });
  }

  editar() {
    const selected = this.items.find(item => item['$selected']) as Banco;
    this.router.navigate(['/cadastros/banco-cadastro/' + selected.id]);
  }

  filterAction(filter = [this.labelFilter]) {
    this.filter();
  }

  filter() {
    this.bancoService.getItems(this.labelFilter).subscribe(res => {
      this.items = res;
    });
  }
}
