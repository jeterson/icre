import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCadastroComponent } from './cliente-cadastro.component';

describe('ClienteCadastroComponent', () => {
  let component: ClienteCadastroComponent;
  let fixture: ComponentFixture<ClienteCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
