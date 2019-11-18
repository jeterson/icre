import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoCadastroComponent } from './banco-cadastro.component';

describe('BancoCadastroComponent', () => {
  let component: BancoCadastroComponent;
  let fixture: ComponentFixture<BancoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
