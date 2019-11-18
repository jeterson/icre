import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@portinari/portinari-ui';
import { PoPageDynamicEditActions } from '@portinari/portinari-templates';
import { Router, ActivatedRoute } from '@angular/router';
import { BancoService } from 'src/app/services/banco.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banco } from 'src/app/models/banco.model';

@Component({
  selector: 'app-banco-cadastro',
  templateUrl: './banco-cadastro.component.html',
  styleUrls: ['./banco-cadastro.component.css']
})
export class BancoCadastroComponent implements OnInit {

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Banco', link: '/cadastros/banco-list' },
    ],
  };
  registerForm: FormGroup;

  constructor(
    private router: Router, private bancoService: BancoService, private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute, private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: [null],
      descricao: ['', Validators.required]
    });

    this.activateRoute.params.subscribe(res => {
      if (res['id']) {
        const id = parseInt(res.id, 10);
        this.getBanco(id);
        this.breadcrumb.items.push({ label: 'Editar' });
      } else {
        this.breadcrumb.items.push({ label: 'Novo' });
      }
    });
  }


  getBanco(id: number) {

    this.bancoService.getItem(id).subscribe(res => {
      console.log(res);
      this.registerForm.setValue(res);
    });
  }

  save() {
    const obj = this.registerForm.value as Banco;
    this.bancoService.save(obj).subscribe(e => {
      this.poNotification.success('Registro Gravado com sucesso!');
      this.cancel();
    }, err => {
      this.poNotification.error(err.message);
    });
  }
  cancel() {
    this.router.navigateByUrl('/cadastros/banco-list');
  }
  saveNew() {
    const obj = this.registerForm.value as Banco;
    this.bancoService.save(obj).subscribe(e => {
      this.poNotification.success('Registro Gravado com sucesso!');
    }, err => {
      this.poNotification.error(err.message);
    });
    this.registerForm.reset();
  }

}
